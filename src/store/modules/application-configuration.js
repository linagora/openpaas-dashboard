import ApplicationSettings from "@/services/application-settings";

const state = {
  baseUrl: ApplicationSettings.VUE_APP_OPENPAAS_URL
};

const getters = {
  getProxyServiceUrl() {
    return new URL("linagora.esn.dashboard/api/cors/", state.baseUrl).toString();
  },
  getServiceUrl(state) {
    return url => new URL(url, state.baseUrl).toString();
  }
};

export default {
  namespaced: true,
  state,
  getters
};
