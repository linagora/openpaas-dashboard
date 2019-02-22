import _ from "lodash";
import EmailClient from "./services/client";

const state = {
  emails: {
    list: [],
    jmapClient: null
  }
};

const types = {
  FETCH_LAST_EMAILS: "FETCH_LAST_EMAILS"
};

const actions = {
  fetchLastEmails: ({ commit, state, getters, rootState }) => {
    const client = new EmailClient({ token: rootState.session.jwtToken, url: getters.getEmailBaseUrl });

    client.getEmails().then(emails => commit(types.FETCH_LAST_EMAILS, emails));
  }
};

const mutations = {
  [types.FETCH_LAST_EMAILS](state, emails) {
    state.emails.list = emails;
  }
};

const getters = {
  getEmailBaseUrl: (state, getters, rootState) => {
    const defaultUrl = `${rootState.applicationConfiguration.baseUrl}/jmap`;

    if (rootState.user.user) {
      const inboxConfiguration = _.find(rootState.user.user.configurations.modules, {
        name: "linagora.esn.unifiedinbox"
      });

      return _.find(inboxConfiguration.configurations || [], { name: "api" }).value;
    }

    return defaultUrl;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
