import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Reservations: [],
    Contacts: [],
    Link: "",
    Text: "",
  },
  getters: {
    Reservations(state) {
      return state.Reservations;
    },

    Contacts(state) {
      return state.Contacts;
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

    Contacts(state, data) {
      state.Contacts = data;
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

    loadContacts(context, api) {
      axios.get(api).then((response) => {
        const data = response.data;

        localStorage.setItem("Contacts", data);
        context.commit("Contacts", data);
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
