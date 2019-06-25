import Vue from "vue";

const state = {
  currentCategory: null
};

const types = {
  SET_CURRENT_CATEGORY: "SET_CURRENT_CATEGORY"
};

const actions = {
  setCategory({ commit }, category) {
    commit(types.SET_CURRENT_CATEGORY, category);
  }
};

const mutations = {
  [types.SET_CURRENT_CATEGORY](state, category) {
    state.currentCategory = category;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
