export type Registration = {
  email: string;
  name: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Deposit = {
  amount: {
    total: number;
    currency: string;
  };
};

export type Widthdraw = {
  amount: {
    value: number;
    currency: string;
  };
};
