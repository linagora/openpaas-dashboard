const state = {
  baseUrl: process.env.VUE_APP_OPENPAAS_URL || "http://localhost:8080"
};

export default { namespaced: true, state };
