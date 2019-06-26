import Vue from "vue";

import { getDisabledWidgets } from "@/services/application-settings";

const state = {
  disabled: getDisabledWidgets() || [],
  settings: {}
};

const types = {
  SET_WIDGET_SETTINGS: "SET_WIDGET_SETTINGS"
};

const actions = {
  getSettings({ commit }) {
    return Vue.$openpaas.api.dashboard
      .getSettings()
      .then(response => {
        const settings = (response.widgets && response.widgets.settings) || [];

        settings.forEach(e => {
          commit(types.SET_WIDGET_SETTINGS, e);
        });
      })
      .catch(err => {
        // TODO
        console.log(err);
      });
  }
};

const mutations = {
  [types.SET_WIDGET_SETTINGS](state, settings) {
    Vue.set(state.settings, settings.type, settings);
  }
};

const getters = {
  // TODO: disabled can come from the settings API also...
  isDisabled: state => widget => state.disabled.includes(widget.type),
  getWidgetInstances: (state, getters, rootState) => (type, dashboard) => {
    const allCreatedCards = Object.values(rootState.dashboard.cards);
    return allCreatedCards.filter(card => dashboard.widgets.includes(card.id) && card.type === type);
  },
  getWidgetSettings: state => type => (state.settings[type] && state.settings[type].settings) || {},
  getStoreWidgets: (state, getters) => {
    return Vue.$dashboard
      .getWidgetsDescription()
      .map(widget => {
        widget.available = true;

        return widget;
      })
      .filter(widget => !getters.isDisabled(widget));
  },
  getCategories: (state, getters) => [...new Set(getters.getStoreWidgets.map(card => card.categories).flat())],
  getCategorySize: (state, getters) => category =>
    getters.getStoreWidgets
      .map(card => card.categories)
      .flat()
      .filter(element => element === category).length
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
