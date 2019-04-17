import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import VueMoment from "vue-moment";
import colors from "vuetify/es5/util/colors";
import "material-design-icons/iconfont/material-icons.css";
import "typeface-roboto/index.css";

import App from "@/App";
import router from "@/router";
import DashboardPlugin from "@/plugins/dashboard";
import { api, auth as servicesAuth } from "@/services";
import ApplicationSettings from "@/services/application-settings";
import store from "@/store";
import i18n from "@/i18n";

const defaultTheme = {
  primary: colors.orange
};

// This prevents polluting the global Axios and Vue instances
// See for instance : https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-446988490
function applicationInit(VueInstance, { axiosInstance = api, auth = servicesAuth, theme = defaultTheme } = {}) {
  VueInstance.use(VueAxios, axiosInstance);
  axiosInstance.defaults.baseURL = store.state.applicationConfiguration.baseUrl;

  VueInstance.router = router;

  VueInstance.use(require("@websanova/vue-auth"), auth);

  VueInstance.use(Vuetify, { theme });

  VueInstance.use(VueMoment);

  VueInstance.use(DashboardPlugin, { store, widgets: loadWidgets() });

  VueInstance.config.productionTip = false;

  return VueInstance;
}

function loadWidgets() {
  const requireComponent = require.context("@/components/widgets", true, /index.js$/);

  return requireComponent.keys().map(fileName => requireComponent(fileName).default);
}

function getApplication(VueInstance) {
  const Application = new VueInstance({
    router,
    store,
    i18n: i18n(VueInstance),
    render: h => h(App)
  }).$mount("#app");

  Application.ApplicationSettings = ApplicationSettings;

  return Application;
}

export { ApplicationSettings, applicationInit, defaultTheme, getApplication };
