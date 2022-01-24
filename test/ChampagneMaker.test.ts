import { expect } from "chai";
import { prepare, deploy, getBigNumber, createSLP } from "./utilities"

describe("ChampagneMaker", function () {
  before(async function () {
    this.enableTimeouts(false)
    await prepare(this, ["ChampagneMaker", "ChampagneCellar", "ChampagneMakerExploitMock", "ERC20Mock", "UniswapV2Factory", "UniswapV2Pair"])
  })
  beforeEach(async function () {
    await deploy(this, [
      ["cham", this.ERC20Mock, ["CHAM", "CHAM", getBigNumber("10000000")]],
      ["dai", this.ERC20Mock, ["DAI", "DAI", getBigNumber("10000000")]],
      ["mic", this.ERC20Mock, ["MIC", "MIC", getBigNumber("10000000")]],
      ["usdc", this.ERC20Mock, ["USDC", "USDC", getBigNumber("10000000")]],
      ["weth", this.ERC20Mock, ["WETH", "ETH", getBigNumber("10000000")]],
      ["strudel", this.ERC20Mock, ["$TRDL", "$TRDL", getBigNumber("10000000")]],
      ["factory", this.UniswapV2Factory, [this.alice.address]],
    ])
    await deploy(this, [["bar", this.ChampagneCellar, [this.cham.address]]])
    await deploy(this, [["champagneMaker", this.ChampagneMaker, [this.factory.address, this.bar.address, this.cham.address, this.weth.address]]])
    await deploy(this, [["exploiter", this.ChampagneMakerExploitMock, [this.champagneMaker.address]]])
    await createSLP(this, "chamEth", this.cham, this.weth, getBigNumber(10))
    await createSLP(this, "strudelEth", this.strudel, this.weth, getBigNumber(10))
    await createSLP(this, "daiEth", this.dai, this.weth, getBigNumber(10))
    await createSLP(this, "usdcEth", this.usdc, this.weth, getBigNumber(10))
    await createSLP(this, "micUSDC", this.mic, this.usdc, getBigNumber(10))
    await createSLP(this, "chamUSDC", this.cham, this.usdc, getBigNumber(10))
    await createSLP(this, "daiUSDC", this.dai, this.usdc, getBigNumber(10))
    await createSLP(this, "daiMIC", this.dai, this.mic, getBigNumber(10))
  })
  describe("setBridge", function () {
    it("does not allow to set bridge for Champagne", async function () {
      await expect(this.champangeMaker.setBridge(this.cham.address, this.weth.address)).to.be.revertedWith("ChampagneMaker: Invalid bridge")
    })

    it("does not allow to set bridge for WETH", async function () {
      await expect(this.champagneMaker.setBridge(this.weth.address, this.cham.address)).to.be.revertedWith("ChampagneMaker: Invalid bridge")
    })

    it("does not allow to set bridge to itself", async function () {
      await expect(this.champangeMaker.setBridge(this.dai.address, this.dai.address)).to.be.revertedWith("ChampagneMaker: Invalid bridge")
    })

    it("emits correct event on bridge", async function () {
      await expect(this.champagneMaker.setBridge(this.dai.address, this.cham.address))
        .to.emit(this.champagneMaker, "LogBridgeSet")
        .withArgs(this.dai.address, this.cham.address)
    })
  })
  describe("convert", function () {
    it("should convert CHAM - ETH", async function () {
      await this.chamEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.convert(this.cham.address, this.weth.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.chamEth.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1897569270781234370")
    })

    it("should convert USDC - ETH", async function () {
      await this.usdcEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.convert(this.usdc.address, this.weth.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.usdcEth.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1590898251382934275")
    })

    it("should convert $TRDL - ETH", async function () {
      await this.strudelEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.convert(this.strudel.address, this.weth.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.strudelEth.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1590898251382934275")
    })

    it("should convert USDC - CHAM", async function () {
      await this.chamUSDC.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.convert(this.usdc.address, this.cham.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.chamUSDC.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1897569270781234370")
    })

    it("should convert using standard ETH path", async function () {
      await this.daiEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.convert(this.dai.address, this.weth.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.daiEth.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1590898251382934275")
    })

    it("converts MIC/USDC using more complex path", async function () {
      await this.micUSDC.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.setBridge(this.usdc.address, this.cham.address)
      await this.champagneMaker.setBridge(this.mic.address, this.usdc.address)
      await this.champagneMaker.convert(this.mic.address, this.usdc.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.micUSDC.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1590898251382934275")
    })

    it("converts DAI/USDC using more complex path", async function () {
      await this.daiUSDC.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.setBridge(this.usdc.address, this.cham.address)
      await this.champagneMaker.setBridge(this.dai.address, this.usdc.address)
      await this.champagneMaker.convert(this.dai.address, this.usdc.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.daiUSDC.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1590898251382934275")
    })

    it("converts DAI/MIC using two step path", async function () {
      await this.daiMIC.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.setBridge(this.dai.address, this.usdc.address)
      await this.champagneMaker.setBridge(this.mic.address, this.dai.address)
      await this.champagneMaker.convert(this.dai.address, this.mic.address)
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.daiMIC.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("1200963016721363748")
    })

    it("reverts if it loops back", async function () {
      await this.daiMIC.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.setBridge(this.dai.address, this.mic.address)
      await this.champagneMaker.setBridge(this.mic.address, this.dai.address)
      await expect(this.champagneMaker.convert(this.dai.address, this.mic.address)).to.be.reverted
    })

    it("reverts if caller is not EOA", async function () {
      await this.chamEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await expect(this.exploiter.convert(this.cham.address, this.weth.address)).to.be.revertedWith("ChampagneMaker: must use EOA")
    })

    it("reverts if pair does not exist", async function () {
      await expect(this.champagneMaker.convert(this.mic.address, this.micUSDC.address)).to.be.revertedWith("ChampagneMaker: Invalid pair")
    })

    it("reverts if no path is available", async function () {
      await this.micUSDC.transfer(this.champagneMaker.address, getBigNumber(1))
      await expect(this.champagneMaker.convert(this.mic.address, this.usdc.address)).to.be.revertedWith("ChampagneMaker: Cannot convert")
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.micUSDC.balanceOf(this.champagneMaker.address)).to.equal(getBigNumber(1))
      expect(await this.cham.balanceOf(this.bar.address)).to.equal(0)
    })
  })

  describe("convertMultiple", function () {
    it("should allow to convert multiple", async function () {
      await this.daiEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.chamEth.transfer(this.champagneMaker.address, getBigNumber(1))
      await this.champagneMaker.convertMultiple([this.dai.address, this.cham.address], [this.weth.address, this.weth.address])
      expect(await this.cham.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.daiEth.balanceOf(this.champagneMaker.address)).to.equal(0)
      expect(await this.cham.balanceOf(this.bar.address)).to.equal("3186583558687783097")
    })
  })
})
