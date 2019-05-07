<template>
  <div id="sidebar-content">
    <v-list>
      <v-list-tile color="blue" class="tile-title">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="tile-title-text">{{ dashboard.name }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <widget-store v-if="dashboard" :dashboard="dashboard"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <span>{{$t("Add a new widget")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list class="mt-1">
      <v-list-tile color="blue" class="tile-title">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="tile-title-text">{{$t("My others dashboards")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-btn icon ripple @click="createDashboard">
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <span>{{$t("Create a new dashboard")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import WidgetStore from "@/components/widget-store/WidgetStore.vue";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters({ dashboard: "dashboards/getCurrentDashboard" })
  },
  methods: {
    createDashboard() {
      // TODO
    }
  },
  components: {
    WidgetStore
  }
};
</script>

<style lang="stylus" scoped>
  span.tile-title-text
    text-transform: uppercase
    font-weight: 500

  .tile-title
    border-left-width: 5px
    border-left-style: solid

</style>
