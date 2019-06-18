import { Api } from "@/services/api";

const VueOpenPaaS = {
  install(Vue, options) {
    let api;
    console.log("Installing OpenPaaS plugin", options);

    api = options.api || new Api(options);

    const $openpaas = { api };

    Object.defineProperties(Vue.prototype, {
      $openpaas: {
        get: function get() {
          return $openpaas;
        }
      }
    });

    Vue.$openpaas = $openpaas;
  }
};

export default VueOpenPaaS;
