import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import signUpScreenPtBr from "./locales/pt-BR/pages/signUp.json";

export const resources = {
  "pt-BR": {
    signUp: signUpScreenPtBr,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "pt-BR",
  ns: ["signUp"],
  resources,
});

export default i18n;
