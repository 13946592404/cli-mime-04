import VueI18n from 'vue-i18n';
import Vue from 'vue';
import getLocale from './locale';

const UserFormTextEN = require('../locales/en-US/ns/UserFormText.json');
const UserFormTextCH = require('../locales/zh-CN/ns/UserFormText.json');

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'ch',
  messages: {
    en: {
      UserFormText: UserFormTextEN,
    },
    ch: {
      UserFormText: UserFormTextCH,
    },
  },
});

export default i18n;
