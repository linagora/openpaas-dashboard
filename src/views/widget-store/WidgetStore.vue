<template>
  <v-container fill-height fluid grid-list-lg pa-5 data-test="widget-store">
    <widget-store
      :dashboard="dashboard"
      :category="category"
      @filter="applyFilter"/>
    <portal to="toolbar-extension">
      <v-btn flat @click="close" data-test="widget-store-close" id="go-back">
        <v-icon left>arrow_back</v-icon>
        {{ $t("Back") }}
      </v-btn>
    </portal>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { routeNames } from "@/router";
import WidgetStore from "@/components/widget-store/WidgetStore.vue";

export default {
  name: "WidgetStoreView",
  props: {
    category: {
      type: String
    }
  },
  components: {
    WidgetStore
  },
  computed: {
    ...mapGetters({
      dashboard: "dashboards/getCurrentDashboard"
    })
  },
  methods: {
    close() {
      this.$router.push({ name: routeNames.DASHBOARD, params: { id: this.dashboard.id } });
    },
    applyFilter(filter) {
      this.$router.push({ name: routeNames.STORE, params: { category: filter.category } });
    }
  }
};
</script>
