// TODO: Save the state in localstorage
import { pull } from "lodash";

const state = {
  cards: ["weather", "clock", "email", "calendar", "contact", "member"]
};

const types = {
  ADD_CARD: "ADD_CARD",
  REMOVE_CARD: "REMOVE_CARD"
};

const actions = {
  addCard({ commit }, card) {
    commit(types.ADD_CARD, card);
  },

  removeCard({ commit }, card) {
    commit(types.REMOVE_CARD, card);
  }
};

const mutations = {
  [types.ADD_CARD](state, card) {
    state.cards.push(card);
  },

  [types.REMOVE_CARD](state, card) {
    pull(state.cards, card);
  }
};

const getters = {
  getCards({ cards }) {
    return cards;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
