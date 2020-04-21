import Store from "./store";
import GuidedTour from "./components/GuidedTour.vue";

const VueTour = {
  install(Vue, options) {
    console.log("Installing Tour plugin", options);
    const store = options.store;
    const enabled = options.settings ? options.settings.guidedTour : false;

    if (!store) {
      throw new Error("options.store is required");
    }

    store.registerModule("tour", Store);

    const $tour = {
      isCompleted: () => {
        return store.getters["tour/isComplete"];
      },
      isEnabled: () => {
        return enabled;
      }
    };

    Object.defineProperties(Vue.prototype, {
      $tour: {
        get: function get() {
          return $tour;
        }
      }
    });

    Vue.$tour = $tour;

    Vue.component(GuidedTour.name, GuidedTour);
  }
};

export default VueTour;
