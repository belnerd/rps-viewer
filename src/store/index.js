import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    history: {},
    tableHeaders: [
      {
        text: 'Time',
        align: 'start',
        sortable: true,
        value: 't',
      },
      {
        text: 'Player A',
        value: 'playerA.name',
      },
      {
        text: 'Played',
        value: 'playerA.played',
      },
      {
        text: 'Player B',
        value: 'playerB.name',
      },
      {
        text: 'Played',
        value: 'playerB.played',
      },
      {
        text: 'Winner',
        value: 'status',
      },
    ],
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
