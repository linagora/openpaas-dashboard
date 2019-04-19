import CardStore from "./store";
import Registry from "./registry";
import DashboardCard from "./components/DashboardCard.vue";
import DashboardCardGrid from "./components/DashboardCardGrid.vue";

const DEFAULT_STATE_NAME = "dashboard";

const VueDashboard = {
  install(Vue, options) {
    console.log("Installing grid plugin", options);
    const store = options.store;

    if (!store) {
      throw new Error("options.store is required");
    }
    const registry = new Registry(store);

    store.registerModule(options.vuexModuleName || DEFAULT_STATE_NAME, CardStore);

    const $dashboard = {
      getWidgets: ids => {
        return ids
          .map(id => registry.get(id))
          .filter(Boolean)
          .map(widget => ({
            main: widget.components.main,
            name: widget.name
          }));
      },
      getWidgetsDescription: () => {
        return registry.getAllDescription();
      },
      useWidget: ({ card }) => {
        store.dispatch("addCard", card.name);
      },
      registerWidget: widget => {
        registry.register(widget);
      }
    };

    if (options.widgets) {
      options.widgets.forEach(widget => $dashboard.registerWidget(widget));
    }

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
