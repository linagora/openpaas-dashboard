import DashboardTour from "./components/Tour";
import store from "./store";
import VueTour from "vue-tour";
require("vue-tour/dist/vue-tour.css");

const components = {
  main: { component: DashboardTour }
};
function init(Vue) {
  Vue.use(VueTour);
}

export default {
  store,
  components,
  DashboardTour,
  init
};
