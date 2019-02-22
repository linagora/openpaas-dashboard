const state = {
  jwtToken: localStorage.getItem("default_auth_token"),
  sessionResolved: null,
  sessionRejected: null
};

state.ready = new Promise((resolve, reject) => {
  state.sessionResolved = resolve;
  state.sessionRejected = reject;
});

const types = {
  SET_JWT_TOKEN: "SET_JWT_TOKEN",
  SET_RESOLVED: "SET_RESOLVED",
  SET_REJECTED: "SET_REJECTED",
  INIT_READY: "INIT_READY"
};

const actions = {
  setJWTToken({ commit }, token) {
    commit(types.SET_JWT_TOKEN, token);
  },

  logout({ dispatch }) {
    require("vue").default.auth.logout();
    return dispatch("resetSession");
  },

  async resetSession({ dispatch }) {
    await dispatch("user/resetUser", null, { root: true });
    dispatch("init");
    return dispatch("setJWTToken", "");
  },

  init({ commit }) {
    commit(types.INIT_READY);
  },

  setResolved({ commit }) {
    commit(types.SET_RESOLVED);
  },

  setRejected({ commit }, error) {
    commit(types.SET_REJECTED, error);
  }
};

const mutations = {
  [types.SET_JWT_TOKEN](state, token) {
    state.jwtToken = token;
  },

  [types.SET_RESOLVED](state) {
    state.sessionResolved();
  },

  // eslint-disable-next-line no-unused-vars
  [types.SET_REJECTED](state, error) {
    // TODO: For now, we do not reject the session because if we are not logged, vue-auth will reject
    // and then we are blocked. We will have to notify in some cases...
    //state.sessionRejected(error);
  },

  [types.INIT_READY](state) {
    state.ready = new Promise((resolve, reject) => {
      state.sessionResolved = resolve;
      state.sessionRejected = reject;
    });
  }
};

const getters = {
  ready: state => state.ready
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
