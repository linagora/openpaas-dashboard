<template>
  <v-dialog v-model="dashboardDialog" scrollable max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon ripple>
        <v-icon color="grey darken-1">add_circle_outline</v-icon>
      </v-btn>
    </template>
    <v-card color="grey lighten-4">
      <v-card-title>
       <span class="headline">Create a new Dashboard</span>
      </v-card-title>
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
              flat
              color="primary"
              :disabled="!newDashboardName || !valid"
              @click="submitDashboardCreateForm">
              Create
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import uuidv4 from "uuid/v4";
export default {
  name: "DashboardCreateForm",
  data: () => ({
    valid: false,
    dashboardDialog: false,
    newDashboardName: "",
    dashboardNameRules: [v => v.length >= 5 || "Name must be more than 5 characters"]
  }),
  methods: {
    submitDashboardCreateForm() {
      let payload = { id: uuidv4(), name: this.newDashboardName };
      this.$store.dispatch("addDashboard", payload);
      this.dashboardDialog = false;
    }
  }
};
</script>
