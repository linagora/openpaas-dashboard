import uuidv4 from "uuid/v4";
// TODO: Make it configurable
import CardStore from "./store/openpaas";
import Registry from "./registry";
import DashboardCard from "./components/DashboardCard.vue";
import DashboardCardGrid from "./components/DashboardCardGrid.vue";
import DashboardRestWidget from "./widgets/rest/RestWidget.vue";
import DashboardAppsGridWidget from "./widgets/apps/AppsGridWidget.vue";

const DEFAULT_STATE_NAME = "dashboard";

const VueDashboard = {
  install(Vue, options) {
    console.log("Installing Dashboard plugin", options);
    const store = options.store;

    if (!store) {
      throw new Error("options.store is required");
    }
    const registry = new Registry(store);

    store.registerModule(options.vuexModuleName || DEFAULT_STATE_NAME, CardStore);

    const $dashboard = {
      getWidgets: widgets => {
        return widgets
          .map(widget => {
            const definition = registry.get(widget.type);

            if (!definition) {
              return;
            }

            // build a new object to not mutate vuex
            return {
              id: widget.id,
              title: widget.title,
              type: widget.type,
              settings: widget.settings,
              components: definition.components
            };
          })
          .filter(Boolean);
      },
      getWidgetsDescription: () => {
        return registry.getAllDescription();
      },
      getWidget: type => {
        return registry.get(type);
      },
      useWidget: ({ card, dashboard, settings = {} }) => {
        const definition = registry.get(card.type);
        if (!definition) {
          return;
        }

        return store.dispatch("dashboard/addCard", {
          card: {
            id: uuidv4(),
            type: card.type,
            settings: { ...(definition.settings && definition.settings.data), ...settings }
          },
          dashboard
        });
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
    Vue.component(DashboardRestWidget.name, DashboardRestWidget);
    Vue.component(DashboardAppsGridWidget.name, DashboardAppsGridWidget);
  }
};

export default VueDashboard;
