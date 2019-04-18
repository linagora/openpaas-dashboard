import CardStore from "./store";
import Registry from "./registry";
import DashboardCard from "./components/DashboardCard.vue";
import DashboardCardGrid from "./components/DashboardCardGrid.vue";

const DEFAULT_STATE_NAME = "dashboard";

const VueDashboard = {
  install(Vue, options) {
    console.log("Installing grid plugin", options);
    const bus = new Vue();
    const store = options.store;

    if (!store) {
      throw new Error("options.store is required");
    }
    const registry = new Registry(store);

    store.registerModule(options.vuexModuleName || DEFAULT_STATE_NAME, CardStore);

    if (options.widgets) {
      options.widgets.forEach(widget => registry.register(widget));
    }

    const $dashboard = {
      registry,
      bus,
      addCard: ({ card }) => {
        store.dispatch("addCard", card.name);
        bus.$emit("add-card", { card });
      }
    };

    Object.defineProperties(Vue.prototype, {
      $dashboard: {
        get: function get() {
          return $dashboard;
        }
      }
    });

    Vue.$dashboard = $dashboard;

    Vue.component(DashboardCard.name, DashboardCard);
    Vue.component(DashboardCardGrid.name, DashboardCardGrid);
  }
};

export default VueDashboard;
