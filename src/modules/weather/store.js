import WeatherClient from "./services/openweathermap";

const state = {
  current: {
    cloudiness: 0,
    windSpeed: 0,
    humidity: 0,
    temperatureValue: 0,
    temperatureHigh: 0,
    temperatureLow: 0,
    location: " ",
    icon: "01d",
    description: ""
  }
};

const types = {
  SET_WEATHER: "SET_WEATHER"
};

const actions = {
  fetchWeather: ({ commit }) => {
    const client = new WeatherClient();

    client.getWeather(location).then(weather => commit(types.SET_WEATHER, weather));
  }
};

const mutations = {
  [types.SET_WEATHER](state, weather) {
    state.current = weather;
  }
};

export default {
  namespaced: false,
  state,
  actions,
  mutations
};
