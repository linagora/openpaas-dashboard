<template>
  <v-dialog 
    v-model="editDashboardDialog" 
    width="300"
  >
    <template v-slot:activator="{ on }">
      <v-list-tile-title
        v-on="on"
      >
        {{$t("Edit")}}
      </v-list-tile-title>
    </template>
    <v-card>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="newDashboardName"
            :rules="dashboardNameRules"
            :label="$t('Name')"
            required
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
             color="primary"
             flat
             @click="editDashboardDialog = false"
            >
              {{$t("Cancel")}}
            </v-btn>
            <v-btn
              flat
              color="primary"
              :disabled="!newDashboardName || !valid"
              @click="edit(dashboard)">
              {{ $t('Edit') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { dashboardNameRulesAll } from "@/utils/rules";
export default {
  name: "DashboardEdit",
  props: {
    dashboard: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    editDashboardDialog: false,
    valid: false,
    newDashboardName: "",
    dashboardNameRules: dashboardNameRulesAll
  }),
  methods: {
    async edit(dashboard) {
      let newname = this.newDashboardName;

      await this.$store.dispatch("renameDashboard", { dashboard, newname });
      this.$store.dispatch("ui/displaySnackbarMessage", this.$t("Dashboard has been edited"));

      this.editDashboardDialog = false;
    }
  },
  mounted: function() {
    this.newDashboardName = this.dashboard.name;
  }
};
</script>
