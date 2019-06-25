<template>
  <v-container fill-height fluid grid-list-lg pa-5>
    <widget-store :dashboard="dashboard" :category="category"/>
    <portal to="toolbar-extension">
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>close</v-icon>
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
    }
  }
};
</script>
