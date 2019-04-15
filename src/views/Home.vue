<template>
  <v-container fluid>
    <card-grid :cards="cards"/>
    <widget-store/>
  </v-container>
</template>

<script>
import Widgets from "@/widgets";
import WidgetStore from "@/views/WidgetStore.vue";
import CardGrid from "@/components/CardGrid.vue";

export default {
  name: "home",
  components: {
    CardGrid,
    WidgetStore
  },
  computed: {
    cards() {
      const { cards } = this.$store.state.card;

      return cards
        .map(card => Widgets.get(card))
        .filter(Boolean)
        .map(widget => ({
          main: widget.components.main,
          name: widget.name
        }));
    }
  }
};
</script>
