<template>
  <div>
    <v-list-tile @click="openDialog()">
      {{$t("Remove")}}
    </v-list-tile>
    <v-dialog v-model="deleteDashboardDialog" width="300">
      <v-card>
        <v-card-text>
          {{ $t("Delete dashboard?") }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="deleteDashboardDialog = false"
          >
            {{$t("Cancel")}}
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="remove(dashboard)"
          >
            {{$t("Delete")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { routeNames } from "@/router";
export default {
  name: "DashboardDelete",
  props: {
    dashboard: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    deleteDashboardDialog: false
  }),
  methods: {
    openDialog() {
      setTimeout(() => (this.deleteDashboardDialog = true));
    },
    remove(dashboard) {
      this.$store.dispatch("removeDashboard", dashboard);
      this.deleteDashboardDialog = false;
      this.$router.push({ name: routeNames.DASHBOARD, params: { id: "default" } });
    }
  }
};
</script>
