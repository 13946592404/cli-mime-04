import VueI18n from 'vue-i18n';
import Vue from 'vue';

import getLocale from './locale';
import i18nData from './i18nData';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'ch',
  messages: {
    en: i18nData.EN,
    ch: i18nData.CH,
  },
});

export default i18n;
