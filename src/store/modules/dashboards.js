const state = {
  current: null
};

const types = {
  SET_CURRENT_DASHBOARD: "SET_CURRENT_DASHBOARD"
};

const actions = {
  loadDashboard({ commit, rootGetters }, id) {
    commit(types.SET_CURRENT_DASHBOARD, rootGetters.getDashboardFromId(id));
  }
};

const mutations = {
  [types.SET_CURRENT_DASHBOARD](state, dashboard) {
    if (dashboard) {
      state.current = dashboard;
    }
  }
};

const getters = {
  getCurrentDashboard(state) {
    return state.current;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
