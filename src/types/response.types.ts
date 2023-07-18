export type TransactionResponse<T> = { data: T };

export type TokenResponse = TransactionResponse<{ token: string }>;

export type LinkResponse = TransactionResponse<{ href: string }>;
