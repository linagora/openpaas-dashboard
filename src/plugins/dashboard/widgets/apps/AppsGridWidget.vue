<template>
  <v-container grid-list-lg fluid pa-0>
    <v-layout row wrap>
      <v-flex
        v-for="application in applications"
        :key="application.name"
        :[iconFlex]="true"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-card flat tile v-on="on" @click="openApplication(application)">
              <apps-grid-icon :url="application.icon" :default-url="defaultIconUrl" :height="iconSize"/>
            </v-card>
          </template>
          <span>{{application.name}}</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppsGridIcon from "./AppsGridIcon.vue";

export default {
  name: "DashboardAppsGridWidget",
  props: {
    applications: {
      type: Array
    },
    defaultIconUrl: {
      type: String
    },
    iconSize: {
      type: String,
      default: "80px"
    },
    iconFlex: {
      type: String,
      default: "xs3"
    }
  },
  methods: {
    openApplication(application) {
      if (this.$listeners["on-application-click"]) {
        this.$emit("on-application-click", application);
      } else {
        window.open(application.url, "_blank");
      }
    }
  },
  components: {
    AppsGridIcon
  }
};
</script>
