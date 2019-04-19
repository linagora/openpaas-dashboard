const LOCALSTORAGE_CARDS_KEY = "op.dashboard.cards";

const state = {
  cards: JSON.parse(localStorage.getItem(LOCALSTORAGE_CARDS_KEY) || "[]")
};

const types = {
  ADD_CARD: "ADD_CARD",
  REMOVE_CARD: "REMOVE_CARD",
  SET_CARDS: "SET_CARDS"
};

const actions = {
  addCard({ commit }, card) {
    commit(types.ADD_CARD, card);
  },

  removeCard({ commit }, card) {
    commit(types.REMOVE_CARD, card);
  },

  setCards({ commit }, cards) {
    commit(types.SET_CARDS, cards);
  }
};

const mutations = {
  [types.ADD_CARD](state, card) {
    state.cards.push(card);

    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.REMOVE_CARD](state, card) {
    const index = state.cards.findIndex(c => c === card);

    if (index > -1) {
      state.cards.splice(index, 1);
    }

    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.SET_CARDS](state, cards) {
    state.cards.length = 0;

    state.cards = cards;
    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
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
