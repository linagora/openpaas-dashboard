<template>
  <v-container fluid>
    <div v-if="dashboard" class="dashboard">
      <dashboard-card-grid :cards="cards" :dashboard="dashboard" :key="dashboard.id"/>
    </div>
    <span v-else class="not-found-dashboard display-1 font-weight-thin">
      {{$t("This dashboard does not exist")}}
      <router-link to="/">{{$t("Go to home page")}}</router-link>
    </span>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "dashboard",
  computed: {
    ...mapGetters({
      dashboard: "dashboards/getCurrentDashboard",
      currentUser: "user/getCurrentUser"
    }),
    cards() {
      if (!this.dashboard) {
        return [];
      }

      const widgets = this.$store.getters.getWidgetsForDashboard(this.dashboard.id);

      return this.$dashboard.getWidgets(widgets || []);
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("dashboards/loadDashboard", to.params.id);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id || this.currentUser._id;

    store.dispatch("dashboards/loadDashboard", id);
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
.not-found-dashboard
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  justify-content: center;
</style>
