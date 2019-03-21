import WeatherClient from "./services/openweathermap";

const initialState = () => ({
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
});

const types = {
  SET_WEATHER: "SET_WEATHER",
  SET_FORECAST: "SET_FORECAST",
  RESET_WEATHER: "RESET_WEATHER"
};

const actions = {
  fetchWeather: ({ commit }) => {
    const client = new WeatherClient();

    return client.getWeather(location).then(weather => commit(types.SET_WEATHER, weather));
  },

  fetchForecast: ({ commit }) => {
    const client = new WeatherClient();

    return client.getForecast(location).then(forecast => commit(types.SET_FORECAST, forecast));
  },

  resetWeatherState: ({ commit }) => {
    commit(types.RESET_WEATHER);
  }
};

const mutations = {
  [types.SET_WEATHER](state, weather) {
    state.current = weather;
  },

  [types.SET_FORECAST](state, forecast) {
    state.forecast = forecast;
  },

  [types.RESET_WEATHER](state) {
    const s = initialState();

    Object.keys(s).forEach(key => (state[key] = s[key]));
  }
};

export default {
  namespaced: false,
  state: initialState(),
  actions,
  mutations
};
