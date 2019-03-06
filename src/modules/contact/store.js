import ContactClient from "./services/client";

const state = {
  contacts: {
    list: []
  }
};

const types = {
  SET_CONTACTS: "SET_CONTACTS"
};

const actions = {
  searchContacts: ({ commit, rootState }, search) => {
    const client = new ContactClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return new Promise((resolve, reject) => {
      client
        .searchContacts(rootState.user.user._id, search)
        .then(contacts => {
          commit(types.SET_CONTACTS, contacts);
          resolve(contacts);
        })
        .catch(reject);
    });
  }
};

const mutations = {
  [types.SET_CONTACTS](state, contacts) {
    state.contacts.list = contacts;
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
