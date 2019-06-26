import Vue from "vue";
import CalendarClient from "./services/client";

const initialState = () => ({
  events: []
});

const types = {
  SET_EVENTS: "SET_EVENTS",
  ADD_EVENTS: "ADD_EVENTS",
  RESET_EVENTS: "RESET_EVENTS"
};

const actions = {
  fetchEvents: ({ commit, rootState }, { start, end }) => {
    const client = new CalendarClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return client
      .getCalendars()
      .then(calendars =>
        Promise.all(
          calendars.map(calendar =>
            client.getEvents(calendar._links.self.href, start, end).then(events => commit(types.ADD_EVENTS, events))
          )
        )
      );
  },

  resetEvents: ({ commit }) => {
    commit(types.SET_EVENTS, []);
  },

  resetCalendarState: ({ commit }) => {
    commit(types.RESET_EVENTS);
  }
};

const mutations = {
  [types.ADD_EVENTS](state, events) {
    if (events && events.length) {
      Vue.set(state, "events", [...state.events, ...events]);
    }
  },

  [types.SET_EVENTS](state, events) {
    Vue.set(state, "events", events);
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
