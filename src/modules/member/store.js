import MemberClient from "./services/client";

const initialState = () => ({
  members: {
    list: []
  }
});

const types = {
  SET_MEMBERS: "SET_MEMBERS",
  RESET_MEMBERS: "RESET_MEMBERS"
};

const actions = {
  searchMembers: ({ commit, rootState }, search) => {
    const client = new MemberClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return new Promise((resolve, reject) => {
      client
        .searchMembers(rootState.user.user.domains[0].domain_id, search)
        .then(members => {
          commit(types.SET_MEMBERS, members);
          resolve(members);
        })
        .catch(reject);
    });
  },

  resetMemberState: ({ commit }) => {
    commit(types.RESET_MEMBERS);
  }
};

const mutations = {
  [types.SET_MEMBERS](state, members) {
    state.members.list = members;
  },

  [types.RESET_MEMBERS](state) {
    const s = initialState();

    Object.keys(s).forEach(key => (state[key] = s[key]));
  }
};

const getters = {};

export default {
  namespaced: false,
  state: initialState(),
  getters,
  actions,
  mutations
};
