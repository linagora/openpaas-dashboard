<template>
  <v-dialog v-model="dialog" scrollable max-width="1200px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon ripple>
        <v-icon color="grey darken-1">add_circle_outline</v-icon>
      </v-btn>
    </template>
    <v-card color="grey lighten-4">
      <v-card-text>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 md6 lg4 v-for="card in cards" :key="card.type">
              <widget-store-card :card="card" @add="useWidget(card)"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="dialog = false">{{$t("Close")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    ...mapGetters({ isDisabled: "widgets/isDisabled" })
  },
  methods: {
    useWidget(card) {
      this.$dashboard.useWidget({ card, dashboard: this.dashboard });
    }
  },
  components: {
    WidgetStoreCard
  }
};
</script>
