import { RegExpCollection } from "src/types/app.types";

export const currenciesAcronyms: string[] = ["USD", "EUR", "GBP"];

export const regExps: RegExpCollection = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
};
