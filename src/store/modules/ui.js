const MINI_DRAWER_LOCALSTORAGE_KEY = "op.dashboard.ui.minidrawer";

const state = {
  snackbar: {
    color: "red",
    message: null,
    timeout: 5000,
    show: false
  },
  miniDrawer: JSON.parse(localStorage.getItem(MINI_DRAWER_LOCALSTORAGE_KEY))
};

const types = {
  DISPLAY_SNACKBAR: "DISPLAY_SNACKBAR",
  DISPLAY_SNACKBAR_MESSAGE: "DISPLAY_SNACKBAR_MESSAGE",
  SET_MINI_DRAWER: "SET_MINI_DRAWER"
};

const actions = {
  displaySnackbar({ commit }, value) {
    commit(types.DISPLAY_SNACKBAR, value);
  },

  displaySnackbarMessage({ commit }, message) {
    commit(types.DISPLAY_SNACKBAR_MESSAGE, message);
  },

  setMiniDrawer({ commit }, value) {
    commit(types.SET_MINI_DRAWER, value);
  }
};

const mutations = {
  [types.DISPLAY_SNACKBAR](state, value) {
    state.snackbar.show = value;
  },

  [types.DISPLAY_SNACKBAR_MESSAGE](state, message) {
    state.snackbar.message = message;
    state.snackbar.show = true;
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
