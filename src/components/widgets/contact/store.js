import ContactClient from "./services/client";

const initialState = () => ({
  contacts: {
    list: []
  }
});

const types = {
  SET_CONTACTS: "SET_CONTACTS",
  RESET_CONTACTS: "RESET_CONTACTS"
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
  },

  resetContactState: ({ commit }) => {
    commit(types.RESET_CONTACTS);
  }
};

const mutations = {
  [types.SET_CONTACTS](state, contacts) {
    state.contacts.list = contacts;
  },

  [types.RESET_CONTACTS](state) {
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
