import Cookie from 'js-cookie';

import daoStyle from 'dao-style-vue';
import 'dao-style-vue/dist/dao-style.css';
import '@/assets/tailwind.css';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import App from './App.vue';

// plugins
Vue.use(VueI18n);
Vue.use(daoStyle);

Vue.config.productionTip = false;

const getLocale = () => {
  const languageMap = new Map([
    ['en-US', 'en'],
    ['zh-CN', 'ch'],
  ]);
  return languageMap.get(Cookie.get('APP_LANG')) // Cookie不为Map中key值则向后查找
  || languageMap.get(navigator.language || navigator.browserLanguage); // 兼容多浏览器
};

new Vue({
  render: (h) => h(App),
  i18n: new VueI18n({
    locale: getLocale(),
  }),
}).$mount('#app');
