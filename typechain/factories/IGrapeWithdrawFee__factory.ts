/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IGrapeWithdrawFee } from "../IGrapeWithdrawFee";

export class IGrapeWithdrawFee__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGrapeWithdrawFee {
    return new Contract(address, _abi, signerOrProvider) as IGrapeWithdrawFee;
  }
}

const _abi = [
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "fraction",
        type: "uint256",
      },
    ],
    name: "removeAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "share",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];