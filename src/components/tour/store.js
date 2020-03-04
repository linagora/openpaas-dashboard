function initialState() {
  return {
    isTourRun: false
  };
}

const types = {
  SET_TOUR_FLAG: "SET_TOUR_FLAG"
};
const LOCALSTORAGE_ITEM = "dashboard:tour:completed";

const actions = {
  fetchTourComplited: ({ commit }) => {
    const isTourRun = localStorage.getItem(LOCALSTORAGE_ITEM) || false;
    commit(types.SET_TOUR_FLAG, isTourRun);
  },

  updateTourComplited: ({ commit }, value) => {
    localStorage.setItem(LOCALSTORAGE_ITEM, value);
    commit(types.SET_TOUR_FLAG, value);
  }
};

const mutations = {
  [types.SET_TOUR_FLAG](state, value) {
    state.isTourRun = value;
  }
};

const getters = {
  getTourComplited: state => state.isTourRun
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
};
