import Vue from "vue";

const MINI_DRAWER_LOCALSTORAGE_KEY = "op.dashboard.ui.minidrawer";

const state = {
  snackbar: {
    color: "red",
    message: null,
    timeout: 5000
  },
  miniDrawer: JSON.parse(localStorage.getItem(MINI_DRAWER_LOCALSTORAGE_KEY))
};

const types = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  SET_MINI_DRAWER: "SET_MINI_DRAWER"
};

const actions = {
  displaySnackbar({ commit }, snackbar) {
    commit(types.SHOW_SNACKBAR, snackbar);
  },

  setMiniDrawer({ commit }, value) {
    commit(types.SET_MINI_DRAWER, value);
  }
};

const mutations = {
  [types.SHOW_SNACKBAR](state, snackbar) {
    snackbar.show = true;
    Vue.set(state, "snackbar", snackbar);
  },

  [types.SET_MINI_DRAWER](state, value) {
    state.miniDrawer = value;
    localStorage.setItem(MINI_DRAWER_LOCALSTORAGE_KEY, state.miniDrawer);
  }
};

const getters = {
  isMiniDrawer(state) {
    return !!state.miniDrawer;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
