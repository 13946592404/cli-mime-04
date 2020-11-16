import VueI18n from 'vue-i18n';
import Vue from 'vue';
import Cookie from 'js-cookie';

import i18nData from './i18nData';

Vue.use(VueI18n);

const getLocale = () => {
  const LANG_COOKIE = Cookie.get('APP_LANG');
  const LANG_BROWSER = navigator.language || navigator.browserLanguage;
  const langMap = new Map([
    ['en-US', 'en'],
    ['zh-CN', 'ch'],
  ]);
  return langMap.get(LANG_COOKIE) || langMap.get(LANG_BROWSER);
};

const i18n = new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'ch',
  messages: {
    en: i18nData.EN,
    ch: i18nData.CH,
  },
});

export default i18n;
