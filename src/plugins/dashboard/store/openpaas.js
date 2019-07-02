import Vue from "vue";

const state = {
  cards: {},
  dashboards: []
};

const types = {
  ADD_CARD: "ADD_CARD",
  REMOVE_CARD: "REMOVE_CARD",
  ORDER_CARDS: "ORDER_CARDS",
  ORDER_DASHBOARDS: "ORDER_DASHBOARDS",
  LIST_DASHBOARDS: "LIST_DASHBOARDS",
  ADD_DASHBOARD: "ADD_DASHBOARD",
  REMOVE_DASHBOARD: "REMOVE_DASHBOARD",
  RENAME_DASHBOARD: "RENAME_DASHBOARD",
  ADD_CARD_TO_DASHBOARD: "ADD_CARD_TO_DASHBOARD",
  REMOVE_CARD_FROM_DASHBOARD: "REMOVE_CARD_FROM_DASHBOARD",
  UPDATE_CARD_SETTINGS: "UPDATE_CARD_SETTINGS"
};

const actions = {
  addCard({ commit }, { card, dashboard }) {
    return Vue.$openpaas.api.dashboard.createWidget(dashboard.id, card).then(() => {
      commit(types.ADD_CARD, card);
      commit(types.ADD_CARD_TO_DASHBOARD, { card, dashboard });
    });
  },

  removeCard({ commit }, { card, dashboard }) {
    return Vue.$openpaas.api.dashboard.deleteWidget(dashboard.id, card.id).then(() => {
      commit(types.REMOVE_CARD, card);
      commit(types.REMOVE_CARD_FROM_DASHBOARD, { card, dashboard });
    });
  },

  setCardsOrder({ commit }, { cards, dashboard }) {
    return Vue.$openpaas.api.dashboard.reorderWidgets(dashboard.id, cards).then(() => {
      commit(types.ORDER_CARDS, { cards, dashboard });
    });
  },

  addDashboard({ commit }, dashboard) {
    return Vue.$openpaas.api.dashboard.create(dashboard).then(created => {
      const newDashboard = {
        id: created._id,
        name: created.name,
        widgets: []
      };

      commit(types.ADD_DASHBOARD, newDashboard);

      return newDashboard;
    });
  },

  loadDashboards({ commit }) {
    return Vue.$openpaas.api.dashboard.list().then(dashboards => {
      dashboards.forEach(dashboard => {
        const newDashboard = {
          id: dashboard._id,
          name: dashboard.name,
          widgets: dashboard.widgets.instances.map(instance => instance.id)
        };

        const widgets = dashboard.widgets.instances.map(widget => ({
          id: widget.id,
          type: widget.type,
          settings: widget.settings
        }));

        widgets.forEach(widget => {
          commit(types.ADD_CARD, widget);
        });

        commit(types.ADD_DASHBOARD, newDashboard);
      });
    });
  },

  removeDashboard({ commit }, dashboard) {
    return Vue.$openpaas.api.dashboard.delete(dashboard.id).then(() => {
      commit(types.REMOVE_DASHBOARD, dashboard);
    });
  },

  renameDashboard({ commit }, { dashboard, newname }) {
    return Vue.$openpaas.api.dashboard.rename(dashboard.id, newname).then(() => {
      commit(types.RENAME_DASHBOARD, { dashboard, newname });
    });
  },

  setDashboardsOrder({ commit }, dashboards) {
    // be optimist to not have the dashboards tilt in the sidebar until the client call resolve
    commit(types.ORDER_DASHBOARDS, dashboards);
    return Vue.$openpaas.api.dashboard.reorderDashboards(dashboards.map(dashboard => dashboard.id));
  },

  updateCardSettings({ commit }, { dashboard, card, settings }) {
    return Vue.$openpaas.api.dashboard.updateWidgetSettings(dashboard.id, card.id, settings).then(() => {
      commit(types.UPDATE_CARD_SETTINGS, { card, settings });
    });
  }
};

const mutations = {
  [types.ADD_CARD](state, card) {
    Vue.set(state.cards, card.id, card);
  },

  [types.REMOVE_CARD](state, card) {
    delete state.cards[card.id];
  },

  [types.ORDER_CARDS](state, { cards, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index < 0) {
      return;
    }

    state.dashboards[index].widgets.length = 0;
    state.dashboards[index].widgets = cards;
  },

  [types.ORDER_DASHBOARDS](state, dashboards) {
    state.dashboards = dashboards;
  },

  [types.UPDATE_CARD_SETTINGS](state, { card, settings }) {
    if (!state.cards[card.id]) {
      return;
    }

    Vue.set(state.cards[card.id], "settings", settings);
  },

  [types.ADD_DASHBOARD](state, dashboard) {
    state.dashboards.push(dashboard);
  },

  [types.REMOVE_DASHBOARD](state, dashboard) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      Vue.delete(state.dashboards, index);
    }
  },

  [types.RENAME_DASHBOARD](state, { dashboard, newname }) {
    dashboard.name = newname;
  },

  [types.ADD_CARD_TO_DASHBOARD](state, { card, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      state.dashboards[index].widgets.push(card.id);
    }
  },

  [types.REMOVE_CARD_FROM_DASHBOARD](state, { card, dashboard }) {
    const index = state.dashboards.findIndex(d => d.id === dashboard.id);

    if (index > -1) {
      const cardIndex = state.dashboards[index].widgets.findIndex(widget => widget === card.id);

      if (cardIndex > -1) {
        Vue.delete(state.dashboards[index].widgets, cardIndex);
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
