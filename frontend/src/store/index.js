import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Reservations: [],
    Link: "",
    Text: "",
  },
  getters: {
    Reservations(state) {
      return state.Reservations;
    },

    Link(state) {
      return state.Link;
    },

    Text(state) {
      return state.Text;
    }
  },
  mutations: {
    Reservations(state, data) {
      state.Reservations = data;
    },

    Link(state, link) {
      state.Link = link;
    },

    Text(state, textTo) {
      state.Text = textTo;
    }

  },
  actions: {
    loadReservations(context, api) {
      axios.get(api).then((Response) => {
        const data = Response.data;

        localStorage.setItem("Reservations", data);
        context.commit("Reservations", data);
      })
    },

    link(context, link) {
      localStorage.setItem("Link", link);
      context.commit("Link", link);
    },

    text(context, textTo) {
      localStorage.setItem("Text", textTo);
      context.commit("Text", textTo);
    }
  },
  modules: {
  }
})
