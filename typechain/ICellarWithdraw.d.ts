/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ICellarWithdrawInterface extends ethers.utils.Interface {
  functions: {
    "withdraw(address,address,address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class ICellarWithdraw extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ICellarWithdrawInterface;

  functions: {
    withdraw(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdraw(address,address,address,uint256,uint256)"(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  withdraw(
    token_: string,
    from: string,
    to: string,
    amount: BigNumberish,
    share: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdraw(address,address,address,uint256,uint256)"(
    token_: string,
    from: string,
    to: string,
    amount: BigNumberish,
    share: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    withdraw(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; shareOut: BigNumber }
    >;

    "withdraw(address,address,address,uint256,uint256)"(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; shareOut: BigNumber }
    >;
  };

  filters: {};

  estimateGas: {
    withdraw(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdraw(address,address,address,uint256,uint256)"(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    withdraw(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdraw(address,address,address,uint256,uint256)"(
      token_: string,
      from: string,
      to: string,
      amount: BigNumberish,
      share: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}