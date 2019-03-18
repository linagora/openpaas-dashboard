import _ from "lodash";
import CalendarClient from "./services/client";

const state = {
  events: {
    list: []
  }
};

const types = {
  SET_EVENTS: "SET_EVENTS"
};

const actions = {
  fetchEvents: ({ commit, rootState }, { start, end }) => {
    const client = new CalendarClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return client.getEvents(rootState.user.user._id, start, end).then(events => commit(types.SET_EVENTS, events));
  }
};

const mutations = {
  [types.SET_EVENTS](state, events) {
    state.events.list = events;
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
  state,
  getters,
  actions,
  mutations
};
