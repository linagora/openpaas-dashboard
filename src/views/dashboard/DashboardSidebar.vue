<template>
  <div id="sidebar-content" data-test="sidebar">
    <v-list class="mt-1">
      <v-list-tile color="blue" class="tile-title" :style="{ borderLeftColor: borderColor }">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="tile-title-text" :style="{ color: titleColor }">{{$t("My dashboards")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-menu bottom left offset-y close-on-click>
            <v-btn slot="activator" flat icon ripple data-test="dashboard-sidebar-actions">
              <v-icon>add_circle_outline</v-icon>
            </v-btn>
            <v-list class="pa-0">
              <v-list-tile data-test="dashboard-open-store" @click="openStore()">
                {{$t("Add a new widget")}}
              </v-list-tile>
              <dashboard-create-form/>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile
        avatar
        v-for="dashboard in dashboards"
        :to="`/boards/${dashboard.id}`"
        :key="dashboard.id"
        active-class="grey lighten-5 active"
        data-test="sidebar-dashboard-item"
      >
        <v-list-tile-avatar>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon class="selected" v-on="on">dashboard</v-icon>
            </template>
            <span>{{ $tc("count.widget.sidebar", countWidgets(dashboard)) }}</span>
          </v-tooltip>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="selected" v-text="getDashboardName(dashboard)"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-menu bottom left offset-y close-on-click min-width="150px">
            <v-btn data-test="dashboard-operations" slot="activator" flat icon ripple @click.native.prevent>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list class="pa-0">
              <dashboard-edit :dashboard="dashboard"/>
              <v-list-tile @click="openStore(dashboard)">
                {{$t("Add a new widget")}}
              </v-list-tile>
              <v-divider/>
              <dashboard-delete v-if="canDelete(dashboard)" :dashboard="dashboard"/>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { theme } from "@/style";
import { routeNames } from "@/router";
import DashboardCreateForm from "@/components/dashboard/DashboardCreateForm.vue";
import DashboardDelete from "@/components/dashboard/DashboardDelete.vue";
import DashboardEdit from "@/components/dashboard/DashboardEdit.vue";

export default {
  name: "Sidebar",
  data: () => ({
    borderColor: theme.colors.blue.base,
    titleColor: theme.colors.blue.base
  }),
  computed: {
    ...mapGetters({
      currentUser: "user/getCurrentUser",
      dashboard: "dashboards/getCurrentDashboard",
      getDashboardName: "dashboards/getDashboardName",
      dashboards: "getDashboards"
    }),
    style: () => theme.colors
  },
  methods: {
    canDelete(dashboard) {
      return dashboard.id !== this.currentUser._id;
    },
    openStore(dashboard) {
      if (dashboard) {
        this.$store.dispatch("dashboards/loadDashboard", dashboard.id);
      }
      this.$router.push({ name: routeNames.STORE });
    },
    countWidgets(dashboard) {
      return (dashboard.widgets && dashboard.widgets.length) || 0;
    }
  },
  components: {
    DashboardCreateForm,
    DashboardDelete,
    DashboardEdit
  }
};
</script>

<style lang="stylus" scoped>
  $color = var(--v-blue-base)

  span.tile-title-text
    color: $color
    text-transform: uppercase
    font-weight: 500

  .tile-title
    color: $color
    border-left-width: 5px
    border-left-style: solid

  .active
    .selected
      color: $color

</style>
