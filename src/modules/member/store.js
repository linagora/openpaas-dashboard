import MemberClient from "./services/client";

const state = {
  members: {
    list: []
  }
};

const types = {
  SET_MEMBERS: "SET_MEMBERS"
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
  }
};

const mutations = {
  [types.SET_MEMBERS](state, members) {
    state.members.list = members;
  }
};

const getters = {};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
