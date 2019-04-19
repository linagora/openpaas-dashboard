import DashboardPlugin from "@/plugins/dashboard";
import store from "@/store";

function init(Vue) {
  Vue.use(DashboardPlugin, { store, widgets: loadWidgets() });
}

function loadWidgets() {
  const requireComponent = require.context("./components/widgets", true, /index.js$/);

  return requireComponent.keys().map(fileName => requireComponent(fileName).default);
}

export default { init };
