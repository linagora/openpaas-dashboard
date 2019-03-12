// TODO: Save the state in localstorage

const state = {
  cards: ["weather", "email", "calendar", "contact", "member"]
};

const types = {
  ADD_CARD: "ADD_CARD"
};

const actions = {
  addCard({ commit }, card) {
    commit(types.ADD_CARD, card);
  }
};

const mutations = {
  [types.ADD_CARD](state, card) {
    state.cards.push(card);
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
