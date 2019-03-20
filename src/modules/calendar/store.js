import CalendarClient from "./services/client";

const initialState = () => ({
  events: {
    list: []
  }
});

const types = {
  SET_EVENTS: "SET_EVENTS",
  RESET_EVENTS: "RESET_EVENTS"
};

const actions = {
  fetchEvents: ({ commit, rootState }, { start, end }) => {
    const client = new CalendarClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return client.getEvents(rootState.user.user._id, start, end).then(events => commit(types.SET_EVENTS, events));
  },

  resetCalendarState: ({ commit }) => {
    commit(types.RESET_EVENTS);
  }
};

const mutations = {
  [types.SET_EVENTS](state, events) {
    state.events.list = events;
  },

  [types.RESET_EVENTS](state) {
    const s = initialState();

    Object.keys(s).forEach(key => (state[key] = s[key]));
  }
};

const getters = {
  getCalendarBaseUrl: (state, getters, rootState) => {
    const defaultUrl = `${rootState.applicationConfiguration.baseUrl}/calendar`;

    return defaultUrl;
  }
};

export default {
  namespaced: false,
  state: initialState(),
  getters,
  actions,
  mutations
};
