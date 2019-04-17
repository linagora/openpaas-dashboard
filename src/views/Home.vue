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
      const { cards } = this.$store.state.card;

      return cards
        .map(card => this.$widgets.get(card))
        .filter(Boolean)
        .map(widget => ({
          main: widget.components.main,
          name: widget.name
        }));
    }
  }
};
</script>
