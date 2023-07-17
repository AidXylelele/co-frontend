import { RegExps } from "src/types/consts.types";

export const regExps: RegExps = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
};
