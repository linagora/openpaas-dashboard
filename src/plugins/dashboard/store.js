import Vue from "vue";

const LOCALSTORAGE_CARDS_KEY = "op.dashboard.cards";
const LOCALSTORAGE_DASHBOARDS_KEY = "op.dashboard.dashboards";

const state = {
  cards: JSON.parse(localStorage.getItem(LOCALSTORAGE_CARDS_KEY) || "{}"),
  dashboards: JSON.parse(localStorage.getItem(LOCALSTORAGE_DASHBOARDS_KEY) || "[]")
};

const types = {
  ADD_CARD: "ADD_CARD",
  REMOVE_CARD: "REMOVE_CARD",
  ORDER_CARDS: "ORDER_CARDS",
  ADD_DASHBOARD: "ADD_DASHBOARD",
  REMOVE_DASHBOARD: "REMOVE_DASHBOARD",
  ADD_CARD_TO_DASHBOARD: "ADD_CARD_TO_DASHBOARD",
  REMOVE_CARD_FROM_DASHBOARD: "REMOVE_CARD_FROM_DASHBOARD",
  UPDATE_CARD_SETTINGS: "UPDATE_CARD_SETTINGS"
};

const actions = {
  addCard({ commit }, { card, dashboard }) {
    commit(types.ADD_CARD, card);
    commit(types.ADD_CARD_TO_DASHBOARD, { card, dashboard });
  },

  removeCard({ commit }, { card, dashboard }) {
    commit(types.REMOVE_CARD, card);
    commit(types.REMOVE_CARD_FROM_DASHBOARD, { card, dashboard });
  },

  setCardsOrder({ commit }, { cards, dashboard }) {
    commit(types.ORDER_CARDS, { cards, dashboard });
  },

  addDashboard({ commit }, dashboard) {
    commit(types.ADD_DASHBOARD, dashboard);
  },

  removeDashboard({ commit }, dashboard) {
    commit(types.REMOVE_DASHBOARD, dashboard);
  },

  updateCardSettings({ commit }, { card, settings }) {
    commit(types.UPDATE_CARD_SETTINGS, { card, settings });
  }
};

const mutations = {
  [types.ADD_CARD](state, card) {
    Vue.set(state.cards, card.id, card);

    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.REMOVE_CARD](state, card) {
    delete state.cards[card.id];

    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.ORDER_CARDS](state, { cards, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index < 0) {
      return;
    }

    state.dashboards[index].widgets.length = 0;
    state.dashboards[index].widgets = cards;

    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.UPDATE_CARD_SETTINGS](state, { card, settings }) {
    if (!state.cards[card.id]) {
      return;
    }

    Vue.set(state.cards[card.id], "settings", settings);
    localStorage.setItem(LOCALSTORAGE_CARDS_KEY, JSON.stringify(state.cards));
  },

  [types.ADD_DASHBOARD](state, dashboard) {
    state.dashboards.push(dashboard);

    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.REMOVE_DASHBOARD](state, dashboard) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      state.dasboards.splice(index, 1);
    }

    localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
  },

  [types.ADD_CARD_TO_DASHBOARD](state, { card, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      state.dashboards[index].widgets.push(card.id);
      localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
    }
  },

  [types.REMOVE_CARD_FROM_DASHBOARD](state, { card, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      const cardIndex = state.dashboards[index].widgets.findIndex(widget => widget.id === card.id);

      if (cardIndex > -1) {
        state.dasboards.splice(cardIndex, 1);
        localStorage.setItem(LOCALSTORAGE_DASHBOARDS_KEY, JSON.stringify(state.dashboards));
      }
    }
  }
};

const getters = {
  getCards({ cards }) {
    return cards;
  },

  getWidgetsForDashboard: state => id => {
    const index = state.dashboards.findIndex(dashboard => dashboard.id === id);

    if (index < 0) {
      return [];
    }

    return (state.dashboards[index].widgets || []).map(id => state.cards[id]).filter(Boolean);
  },

  getDashboards: state => {
    return state.dashboards;
  },

  getDashboardFromId: state => id => {
    const index = state.dashboards.findIndex(dashboard => dashboard.id === id);

    return state.dashboards[index];
  },

  getSettingsForWidget: state => id => {
    if (!state.cards[id]) {
      return null;
    }

    return state.cards[id].settings || {};
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
