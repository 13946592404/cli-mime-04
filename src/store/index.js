import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    version: 'v1.2.0',
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
  },
});

export function useStore() {
  return store;
}

export default store;
