import Vue from "vue";
import VueI18n from "vue-i18n";
import { FALLBACK_LANGUAGE, DEFAULT_LANGUAGE } from "./constants";
import en from "@i18n/en.json";

Vue.use(VueI18n);

const getLocale = () => {
  const browserLocale = navigator.language;

  return browserLocale.includes("-") ? browserLocale.split("-")[0] : browserLocale || DEFAULT_LANGUAGE;
};

const initialState = {
  locale: "en",
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { en }
};

const i18n = new VueI18n(initialState);

const loadLanguage = locale => {
  if (!locale || locale === i18n.locale) {
    return Promise.resolve();
  }

  if (locale === initialState.locale) {
    setI18nLocale(locale);
    return Promise.resolve();
  }

  if (i18n.locale !== locale) {
    return import(/* webpackMode: "lazy-once" */ `@i18n/${locale}.json`).then(msgs => {
      console.log("Switching locale to", locale);
      i18n.setLocaleMessage(locale, msgs.default);
      return setI18nLocale(locale);
    });
  }
};

const setI18nLocale = locale => {
  console.log(`Setting locale to ${locale}`);
  i18n.locale = locale;

  return locale;
};

export { getLocale, loadLanguage, i18n };
