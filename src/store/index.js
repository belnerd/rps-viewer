import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    history: {},
  },
  getters: {},
  mutations: {
    SET_HISTORY: (state, payload) => {
      state.history = payload;
    },
    CLEAR_HISTORY: (state) => {
      state.history = null;
    }
  },
  actions: {},
});

export default store;
