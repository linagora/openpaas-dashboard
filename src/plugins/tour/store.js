const LOCALSTORAGE_ITEM = "dashboard:tour:completed";
const types = {
  SET_TOUR_FLAG: "SET_TOUR_FLAG"
};

function initialState() {
  return {
    completed: localStorage.getItem(LOCALSTORAGE_ITEM) || false
  };
}

const actions = {
  setCompleted: ({ commit }, value) => {
    localStorage.setItem(LOCALSTORAGE_ITEM, value);
    commit(types.SET_TOUR_FLAG, value);
  }
};

const mutations = {
  [types.SET_TOUR_FLAG](state, value) {
    state.completed = value;
  }
};

const getters = {
  isComplete: state => state.completed
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
};
