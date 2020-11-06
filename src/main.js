import Vue from 'vue';
import daoStyle from 'dao-style-vue';

import App from './App.vue';

import 'dao-style-vue/dist/dao-style.css';
import '@/assets/tailwind.css';

// plugins
Vue.use(daoStyle);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
