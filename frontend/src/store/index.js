import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Reservations: [],
  },
  getters: {
    Reservations(state) {
      return state.Reservations;
    }
  },
  mutations: {
    Reservations(state, data) {
      state.Reservations = data;
    }
  },
  actions: {
    loadReservations(context, api) {
      axios.get(api).then((Response) => {
        const data = Response.data;

        localStorage.setItem("Reservations", data);
        context.commit("Reservations", data);
      })
    }
  },
  modules: {
  }
})
