<template>
  <v-card color="grey lighten-4" data-test="widget-store">
    <v-card-text>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 md6 lg4 v-for="card in cards" :key="card.type">
            <widget-store-card :card="card" :counter="countInstanceOfType(card.type)" @add="useWidget(card)"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn data-test="widget-dialog-close" flat color="primary" @click="close()">{{$t("Close")}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import WidgetStoreCard from "./WidgetStoreCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "WidgetStore",
  data: () => ({
    dialog: false
  }),
  props: {
    dashboard: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getWidgetInstances: "widgets/getWidgetInstances",
      cards: "widgets/getStoreWidgets",
      getSettings: "widgets/getWidgetSettings"
    })
  },
  methods: {
    useWidget(card) {
      this.$dashboard.useWidget({ card, dashboard: this.dashboard, settings: this.getSettings(card.type) });
    },
    countInstanceOfType(cardType) {
      return (this.getWidgetInstances(cardType, this.dashboard) || []).length;
    },
    close() {
      this.$emit("close");
    }
  },
  components: {
    WidgetStoreCard
  }
};
</script>
