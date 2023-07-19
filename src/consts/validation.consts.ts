import { RegExpsCollection } from "src/types/collections.types";

export const currenciesAcronyms: string[] = ["USD", "EUR", "GBP"];

export const regExps: RegExpsCollection = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
};
