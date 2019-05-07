<template>
  <v-container fluid>
    <div class="dashboard">
      <dashboard-card-grid :cards="cards" :dashboard="dashboard"/>
    </div>
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

<style lang="stylus" scoped>

card-width = 430px

@media (max-width: 859px) {
  .dashboard >>> #card-container {
    width: card-width;
  }
}
@media (min-width: 860px) and (max-width: 1289px) {
  .dashboard >>> #card-container  {
    width: card-width * 2;
  }
}
@media (min-width: 1290px) and (max-width: 1719px) {
  .dashboard >>> #card-container {
    width: card-width * 2;
  }
}
@media (min-width: 1720px) and (max-width: 2149px) {
  .dashboard >>> #card-container  {
    width: card-width * 3;
  }
}
@media (min-width: 2150px) {
  .dashboard >>> #card-container {
    width: card-width * 4;
  }
}
</style>
