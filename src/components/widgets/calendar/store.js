import Vue from "vue";
import CalendarClient from "./services/client";

const initialState = () => ({
  events: {}
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

    return client
      .getCalendars()
      .then(calendars =>
        Promise.all(
          calendars.map(calendar =>
            client.getEvents(calendar._links.self.href, start, end).then(events => commit(types.SET_EVENTS, events))
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
  [types.SET_EVENTS](state, events) {
    events.forEach(event => Vue.set(state.events, event.uid, event));
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
  },
  getCalendarEvents: state => Object.values(state.events)
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
};
