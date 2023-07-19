import { PassportData } from "./auth.types";

export type DepositTransaction = {
  amount: {
    total: number;
    currency: string;
  };
};

export type WithdrawTransaction = {
  amount: {
    value: number;
    currency: string;
  };
};

export type Deposit = PassportData & {
  transactions: DepositTransaction[];
};

export type Withdraw = PassportData & {
  transactions: WithdrawTransaction[];
};

export type ApprovalQueries = {
  PayerID: string;
  paymentId: string;
};

export type TransactionResponse<T> = { data: T };

export type TokenResponse = TransactionResponse<{ token: string }>;

export type LinkResponse = TransactionResponse<{ href: string }>;
