import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import chatScreenPtBr from "./locales/pt-BR/pages/chat.json";
import signInScreenPtBr from "./locales/pt-BR/pages/signIn.json";
import signUpScreenPtBr from "./locales/pt-BR/pages/signUp.json";

export const resources = {
  "pt-BR": {
    signUp: signUpScreenPtBr,
    signIn: signInScreenPtBr,
    chat: chatScreenPtBr,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "pt-BR",
  ns: ["signUp"],
  resources,
});

export default i18n;
