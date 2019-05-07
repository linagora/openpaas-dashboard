<template>
  <div id="sidebar-content">
    <v-list>
      <v-list-tile color="blue">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="main">My dashboard</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-btn icon ripple @click="addWidget">
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <span>{{$t("Add a new widget")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list class="mt-1">
      <v-list-tile color="blue">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="main">{{$t("My others dashboards")}}</span>
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
export default {
  name: "Sidebar",
  methods: {
    createDashboard() {
      // TODO
    },
    addWidget() {
      // TODO
    }
  }
};
</script>

<style lang="stylus" scoped>
  .main
    text-transform: uppercase
    font-weight: 500
</style>
