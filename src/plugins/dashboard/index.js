import Widgets from "./widgets";
import Card from "./components/Card.vue";
import CardGrid from "./components/CardGrid.vue";

export default {
  install(Vue, options = {}) {
    console.log("Installing grid plugin", options);
    if (!options.store) {
      throw new Error("options.store is required");
    }

    const widgets = new Widgets(options.store);

    if (options.widgets) {
      options.widgets.forEach(widget => widgets.register(widget));
    }

    Object.defineProperties(Vue.prototype, {
      $widgets: {
        get: function get() {
          return widgets;
        }
      }
    });

    Vue.$widgets = widgets;

    Vue.component("DashboardCard", Card);
    Vue.component("DashboardCardGrid", CardGrid);
  }
};
