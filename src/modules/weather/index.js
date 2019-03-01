import Weather from "./components/Weather.vue";
import store from "./store";

const components = [{ name: "weather", component: Weather }];

export default {
  components,
  store
};
