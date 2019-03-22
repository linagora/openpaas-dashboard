import Weather from "./components/Weather.vue";
import store from "./store";

const components = {
  main: { component: Weather, color: "primary" }
};

export default {
  name: "weather",
  title: "Weather",
  icon: "cloud_queue",
  description: "Local weather forecast",
  components,
  store,
  hooks: {
    onRemove: store => {
      store.dispatch("resetWeatherState");
    }
  }
};
