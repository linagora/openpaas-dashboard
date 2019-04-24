<template>
  <v-container fluid>
    <dashboard-card-grid :cards="cards" :dashboard="dashboard"/>
    <widget-store v-if="dashboard" :dashboard="dashboard"/>
  </v-container>
</template>

<script>
import WidgetStore from "@/views/WidgetStore.vue";

export default {
  name: "home",
  components: {
    WidgetStore
  },
  mounted() {
    if (!this.$store.state.dashboard.dashboards || this.$store.state.dashboard.dashboards.length === 0) {
      this.$store.dispatch("addDashboard", { id: "default", name: "My dashboard", widgets: [] });
    }
  },
  computed: {
    dashboard() {
      return this.$store.state.dashboard.dashboards && this.$store.state.dashboard.dashboards[0];
    },
    cards() {
      if (!this.dashboard) {
        return [];
      }

      const widgets = this.$store.getters.getWidgetsForDashboard(this.dashboard.id);

      return this.$dashboard.getWidgets(widgets || []);
    }
  }
};
</script>
