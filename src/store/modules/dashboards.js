import { i18n } from "@/i18n";

const state = {
  current: null
};

const types = {
  SET_CURRENT_DASHBOARD: "SET_CURRENT_DASHBOARD"
};

const actions = {
  loadDashboard({ commit }, id) {
    commit(types.SET_CURRENT_DASHBOARD, id);
  }
};

const mutations = {
  [types.SET_CURRENT_DASHBOARD](state, dashboardId) {
    if (dashboardId) {
      state.current = dashboardId;
    }
  }
};

const getters = {
  getCurrentDashboard(state, getters, rootState, rootGetters) {
    return rootGetters.getDashboardFromId(state.current);
  },
  getAllDashboards(state, getters, rootState, rootGetters) {
    return rootGetters.getDashboards;
  },
  isMainDashboard: (state, getters, rootState, rootGetters) => dashboard =>
    rootGetters["user/getCurrentUser"]._id === dashboard.id,
  getDashboardName: (state, getters) => dashboard =>
    getters.isMainDashboard(dashboard) ? i18n.t("Main") : dashboard.name
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
