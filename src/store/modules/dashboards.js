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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
