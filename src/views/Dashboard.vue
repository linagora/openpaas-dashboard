<template>
  <v-container fluid>
    <div class="dashboard">
      <dashboard-card-grid :cards="cards" :dashboard="dashboard" :key="dashboard.id"/>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { routeNames } from "@/router";

export default {
  name: "dashboard",
  props: {
    id: {
      type: String
    }
  },
  computed: {
    ...mapGetters({ dashboard: "dashboards/getCurrentDashboard" }),
    cards() {
      if (!this.dashboard) {
        return [];
      }

      const widgets = this.$store.getters.getWidgetsForDashboard(this.dashboard.id);

      return this.$dashboard.getWidgets(widgets || []);
    }
  },
  async mounted() {
    if (!this.$store.state.dashboard.dashboards || this.$store.state.dashboard.dashboards.length === 0) {
      const id = "default";

      await this.$store.dispatch("addDashboard", { id, name: "My dashboard", widgets: [] });

      this.$router.push({ name: routeNames.DASHBOARD, params: { id } });
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("dashboards/loadDashboard", to.params.id);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("dashboards/loadDashboard", to.params.id);
    next();
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
