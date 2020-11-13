import daoStyle from 'dao-style-vue';
import 'dao-style-vue/dist/dao-style.css';
import '@/assets/tailwind.css';
import VueCodeMirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import Vue from 'vue';
import App from './App.vue';
import i18n from './plugins/i18n';
import './plugins/veeValidation';

// plugins
Vue.use(daoStyle);
Vue.use(VueCodeMirror);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount('#app');
