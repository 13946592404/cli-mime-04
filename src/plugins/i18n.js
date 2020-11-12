import Cookie from 'js-cookie';
import VueI18n from 'vue-i18n';
import Vue from 'vue';

const ENUserFormText = require('../locales/en-US/ns/UserFormText.json');
const CHUserFormText = require('../locales/zh-CN/ns/UserFormText.json');

Vue.use(VueI18n);

const getLocale = () => {
  const LANG_COOKIE = 'APP_LANG';
  const LANG_MAP = new Map([
    ['en-US', 'en'],
    ['zh-CN', 'ch'],
  ]);
  return LANG_MAP.get(Cookie.get(LANG_COOKIE)) // Cookie值不在map的key中则返回undefined，向后查找
  || LANG_MAP.get(navigator.language || navigator.browserLanguage); // 兼容多浏览器
};

const i18n = new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'ch',
  messages: {
    en: {
      texts: ENUserFormText,
    },
    ch: {
      texts: CHUserFormText,
    },
  },
});

export default i18n;
