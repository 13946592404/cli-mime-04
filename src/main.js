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
  const LANG_COOKIE = 'APP_LANG';
  const LANG_MAP = new Map([
    ['en-US', 'en'],
    ['zh-CN', 'ch'],
  ]);
  return LANG_MAP.get(Cookie.get(LANG_COOKIE)) // Cookie值不在map的key中则返回undefined，向后查找
  || LANG_MAP.get(navigator.language || navigator.browserLanguage); // 兼容多浏览器
};

new Vue({
  render: (h) => h(App),
  i18n: new VueI18n({
    locale: getLocale(),
  }),
}).$mount('#app');
