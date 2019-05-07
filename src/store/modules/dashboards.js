const state = {
  current: null
};

const types = {
  SET_CURRENT_DASHBOARD: "SET_CURRENT_DASHBOARD"
};

const actions = {
  loadDashboard({ commit, rootState }) {
    // TODO: Load/get from ID
    commit(types.SET_CURRENT_DASHBOARD, rootState.dashboard.dashboards[0]);
  }
};

const mutations = {
  [types.SET_CURRENT_DASHBOARD](state, dashboard) {
    state.current = dashboard;
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
