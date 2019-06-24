<template>
  <v-card color="grey lighten-4" data-test="widget-store">
    <v-toolbar id="store-toolbar" dense color="blue" :dark="true" >
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        {{$t("Add a widget")}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-card-actions class="store-toolbar-action">
        <v-btn data-test="widget-dialog-close" flat fab @click="close()"><v-icon>close</v-icon></v-btn>
      </v-card-actions>
    </v-toolbar>
    <v-card-text>
      <v-container fill-height fluid grid-list-lg pt-5>
        <v-layout row wrap>
          <v-flex xs4 md4 lg4 offset-xs4>
            <v-select
              :items="dashBoards"
              :item-text="getDashboardName"
              item-value="id"
              v-on:change="changeTargetBoard"
              :value="currentDashboard.id"
              :label="$t('Add a widget to dashboard')"
              color="blue"
            >
            </v-select>
          </v-flex>
          <v-flex xs12 md6 lg6 v-for="card in cards" :key="card.type" px-3>
            <widget-store-card :card="card" :counter="countInstanceOfType(card.type)" @add="useWidget(card)"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import WidgetStoreCard from "./WidgetStoreCard.vue";
import { routeNames } from "@/router";
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
      currentDashboard: "dashboards/getCurrentDashboard",
      getSettings: "widgets/getWidgetSettings",
      dashBoards: "dashboards/getAllDashboards",
      getDashboardName: "dashboards/getDashboardName"
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
      this.$router.push({ name: routeNames.DASHBOARD, params: { id: this.currentDashboard.id } });
    },
    changeTargetBoard(uuid) {
      this.$store.dispatch("dashboards/loadDashboard", uuid);
    }
  },
  components: {
    WidgetStoreCard
  }
};
</script>

<style lang="stylus" scoped>
#store-toolbar
  .store-toolbar-action
    padding 0
    button
      padding 0
      width: 40px;
      height: 40px;
  >>> div
    padding 0
</style>
