import Vue from "vue";
import Vuex from "vuex";
import ApplicationSettings from "@/services/application-settings";
import state from "./state";
import plugins from "./plugins";
import applicationConfiguration from "./modules/application-configuration";
import session from "./modules/session";
import ui from "./modules/ui";
import user from "./modules/user";
import dashboards from "./modules/dashboards";
import widgets from "./modules/widgets";
import tour from "@/components/tour/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    applicationConfiguration,
    session,
    ui,
    user,
    dashboards,
    widgets,
    tour
  },
  plugins,
  state,
  strict: ApplicationSettings.NODE_ENV !== "production"
});
