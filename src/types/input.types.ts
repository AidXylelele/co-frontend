export type Registration = {
  email: string;
  name: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

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

export type Authorization = {
  email: string;
};

export type Deposit = Authorization & {
  transactions: DepositTransaction[];
};

export type Withdraw = Authorization & {
  transactions: WithdrawTransaction[];
};

export type ApprovalQueries = {
  PayerID: string;
  paymentId: string;
};
