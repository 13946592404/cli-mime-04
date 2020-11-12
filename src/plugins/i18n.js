import VueI18n from 'vue-i18n';
import Vue from 'vue';

import getLocale from './locale';
import i18nSupport from './i18n-support';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'ch',
  messages: {
    en: i18nSupport.EN,
    ch: i18nSupport.CH,
  },
});

export default i18n;
