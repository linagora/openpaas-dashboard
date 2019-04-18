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

      return cards
        .map(card => this.$dashboard.registry.get(card))
        .filter(Boolean)
        .map(widget => ({
          main: widget.components.main,
          name: widget.name
        }));
    }
  }
};
</script>
