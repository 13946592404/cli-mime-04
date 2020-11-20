import Vue from 'vue';
import daoStyle from 'dao-style-vue';
import VueCodeMirror from 'vue-codemirror';

import 'es6-promise/auto';
import 'dao-style-vue/dist/dao-style.css';
import '@/assets/tailwind.css';
import 'codemirror/lib/codemirror.css';

import App from './App.vue';
import i18n from './plugins/i18n';
import './plugins/veeValidation';
import store from './store';
import router from './routers/plugin';

// plugins
Vue.use(daoStyle);
Vue.use(VueCodeMirror);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
  store,
  router,
}).$mount('#app');
