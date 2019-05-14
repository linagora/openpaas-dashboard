<template>
  <div id="sidebar-content">
    <v-list>
      <v-list-tile color="blue" class="tile-title" :style="{ borderLeftColor: borderColor }">
        <v-list-tile-content>
          <v-list-tile-title>
            <transition name="fadein">
              <span
                class="tile-title-text"
                :style="{ color: titleColor }"
                :key="dashboard.id">{{ dashboard.name }}</span>
            </transition>
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
      <v-list-tile color="blue" class="tile-title" :style="{ borderLeftColor: borderColor }">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="tile-title-text" :style="{ color: titleColor }">{{$t("My dashboards")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="dashboard in dashboards"
        :to="`/boards/${dashboard.id}`"
        :key="dashboard.id"
        active-class="grey lighten-5"
      >
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="dashboard.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <dashboard-form />
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
import { theme } from "@/style";
import WidgetStore from "@/components/widget-store/WidgetStore.vue";
import DashboardForm from "@/components/ui/DashboardForm.vue";

export default {
  name: "Sidebar",
  data: () => ({
    borderColor: theme.colors.blue.base,
    titleColor: theme.colors.blue.base
  }),
  computed: {
    ...mapGetters({ dashboard: "dashboards/getCurrentDashboard", dashboards: "getDashboards" }),
    style: () => theme.colors
  },
  components: {
    WidgetStore,
    DashboardForm
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

  .fadein-enter-active
    transition: all .2s ease;

  .fadein-enter, .fadein-leave-to
    opacity: 0;

</style>
