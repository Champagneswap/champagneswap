/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IWineMakerV2 } from "../IWineMakerV2";

export class IWineMakerV2__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWineMakerV2 {
    return new Contract(address, _abi, signerOrProvider) as IWineMakerV2;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "lpToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "_lpToken",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
