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
    cards() {
      return this.$dashboard
        .getWidgetsDescription()
        .map(widget => {
          widget.available = true;

          return widget;
        })
        .filter(widget => !this.isDisabled(widget));
    },
    ...mapGetters({ isDisabled: "widgets/isDisabled", getWidgetInstances: "widgets/getWidgetInstances" })
  },
  methods: {
    useWidget(card) {
      this.$dashboard.useWidget({ card, dashboard: this.dashboard });
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
