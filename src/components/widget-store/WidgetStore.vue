<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
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
    </v-layout>
    <v-layout row wrap>
      <v-flex v-if="!filteredCards || !filteredCards.length" xs12 md6 offset-md3>
        <div  id="no-widgets">
          <v-icon color="primary" size="80px" dark>widgets</v-icon>
          <span class="pt-2 text-xs-center grey--text">
            {{ $t('There are no widgets') }}
          </span>
        </div>
      </v-flex>
      <transition-group v-else name="fade" tag="div" class="layout row wrap">
        <v-flex xs12 md6 v-for="card in filteredCards" :key="card.type">
          <widget-store-card
            :card="card"
            :counter="countInstanceOfType(card.type)"
            @add="useWidget(card)"
            @filter="applyFilter"/>
        </v-flex>
      </transition-group>
    </v-layout>
  </v-container>
</template>

<script>
import WidgetStoreCard from "./WidgetStoreCard.vue";
import { mapGetters } from "vuex";
import { routeNames } from "@/router";

export default {
  name: "WidgetStore",
  data: () => ({
    dialog: false
  }),
  props: {
    dashboard: {
      type: Object,
      required: true
    },
    category: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      getWidgetInstances: "widgets/getWidgetInstances",
      storeWidgets: "widgets/getStoreWidgets",
      currentDashboard: "dashboards/getCurrentDashboard",
      getSettings: "widgets/getWidgetSettings",
      dashBoards: "dashboards/getAllDashboards",
      getDashboardName: "dashboards/getDashboardName"
    }),
    cards() {
      if (!this.category || this.category === "all") {
        return this.storeWidgets;
      }

      return this.storeWidgets.filter(widget => (widget.categories || []).includes(this.category));
    },
    filteredCards() {
      if (!this.$route.query.search) {
        return this.cards;
      }
      return this.cards.filter(card => this.search(this.$route.query.search, card));
    }
  },
  methods: {
    useWidget(card) {
      this.$dashboard
        .useWidget({ card, dashboard: this.dashboard, settings: this.getSettings(card.type) })
        .then(() =>
          this.$store.dispatch(
            "ui/displaySnackbarMessage",
            this.$t("Widget has been added to dashboard {name}", { name: this.currentDashboard.name })
          )
        )
        .catch(err => {
          console.log("Error while adding widget", err);
          this.$store.dispatch("ui/displaySnackbarMessage", this.$t("Error while adding widget"));
        });
    },
    countInstanceOfType(cardType) {
      return (this.getWidgetInstances(cardType, this.dashboard) || []).length;
    },
    changeTargetBoard(dashboardId) {
      this.$store.dispatch("dashboards/loadDashboard", dashboardId);
      const payload = { search: this.$route.query.search };
      this.$router.push({ name: routeNames.STORE, query: payload });
    },
    applyFilter(filter) {
      this.$emit("filter", filter);
    },
    search(query, card) {
      return `${this.$t(card.title)} ${this.$t(card.description)}`.toLowerCase().includes(query.toLowerCase());
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

.fade-enter-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

#no-widgets
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  justify-content: center;
</style>
