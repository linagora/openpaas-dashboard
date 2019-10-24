import ApplicationSettings from "@/services/application-settings";

const state = {
  baseUrl: ApplicationSettings.VUE_APP_OPENPAAS_URL,
  searchUrl: ApplicationSettings.VUE_APP_SEARCH_URL,
  applicationMenuItems: ApplicationSettings.VUE_APP_APPLICATION_MENU
};

const getters = {
  getProxyServiceUrl() {
    return new URL("linagora.esn.dashboard/api/cors/", state.baseUrl).toString();
  },
  getServiceUrl(state) {
    return url => new URL(url, state.baseUrl).toString();
  },
  getSearchUrl(state) {
    return state.searchUrl;
  },
  getApplications(state) {
    return state.applicationMenuItems || [];
  }
};

export default {
  namespaced: true,
  state,
  getters
};
