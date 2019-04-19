<template>
  <v-container fluid>
    <dashboard-card-grid :cards="cards"/>
    <widget-store/>
  </v-container>
</template>

<script>
import WidgetStore from "@/views/WidgetStore.vue";

export default {
  name: "home",
  components: {
    WidgetStore
  },
  computed: {
    cards() {
      const { cards } = this.$store.state.dashboard;

      return this.$dashboard.getWidgets(cards);
    }
  }
};
</script>
