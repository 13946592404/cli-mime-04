import VueI18n from 'vue-i18n';
import Vue from 'vue';
import getLocale from './locale';

const ENUserFormText = require('../locales/en-US/ns/UserFormText.json');
const CHUserFormText = require('../locales/zh-CN/ns/UserFormText.json');

Vue.use(VueI18n);

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
