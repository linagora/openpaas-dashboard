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
  },
  forecast: []
};

const types = {
  SET_WEATHER: "SET_WEATHER",
  SET_FORECAST: "SET_FORECAST"
};

const actions = {
  fetchWeather: ({ commit }) => {
    const client = new WeatherClient();

    client.getWeather(location).then(weather => commit(types.SET_WEATHER, weather));
  },

  fetchForecast: ({ commit }) => {
    const client = new WeatherClient();

    client.getForecast(location).then(forecast => commit(types.SET_FORECAST, forecast));
  }
};

const mutations = {
  [types.SET_WEATHER](state, weather) {
    state.current = weather;
  },

  [types.SET_FORECAST](state, forecast) {
    state.forecast = forecast;
  }
};

export default {
  namespaced: false,
  state,
  actions,
  mutations
};
