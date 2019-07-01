import _ from "lodash";
import EmailClient from "./services/client";

const initialState = () => ({
  emails: {
    list: [],
    jmapClient: null
  }
});

const types = {
  FETCH_LAST_EMAILS: "FETCH_LAST_EMAILS",
  RESET_EMAILS: "RESET_EMAILS"
};

const actions = {
  fetchLastEmails: ({ commit, getters, rootState }) => {
    const client = new EmailClient({ token: rootState.session.jwtToken, url: getters.getEmailBaseUrl });

    return client.getEmails().then(emails => commit(types.FETCH_LAST_EMAILS, emails));
  },

  resetEmailState: ({ commit }) => {
    commit(types.RESET_EMAILS);
  }
};

const mutations = {
  [types.FETCH_LAST_EMAILS](state, emails) {
    state.emails.list = emails;
  },

  [types.RESET_EMAILS](state) {
    const s = initialState();

    Object.keys(s).forEach(key => (state[key] = s[key]));
  }
};

const getters = {
  getEmailBaseUrl: (state, getters, rootState) => {
    const defaultUrl = `${rootState.applicationConfiguration.baseUrl}/jmap`;

    if (rootState.user.user) {
      const inboxConfiguration = _.find(rootState.user.user.configurations.modules, {
        name: "linagora.esn.unifiedinbox"
      });

      if (!inboxConfiguration) {
        return defaultUrl;
      }

      return _.find(inboxConfiguration.configurations || [], { name: "api" }).value;
    }

    return defaultUrl;
  }
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
};
