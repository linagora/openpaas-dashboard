<template>
  <div>
    <v-list-tile @click="openDialog()">
      {{$t("Edit")}}
    </v-list-tile>
    <v-dialog v-model="editDashboardDialog" width="300">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('Edit dashboard') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent="edit(dashboard)">
            <v-text-field
              v-model="newDashboardName"
              :rules="dashboardNameRules"
              :label="$t('Name')"
              :disabled="!canEdit"
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
                :disabled="!canEdit || !newDashboardName || !valid"
                @click="edit(dashboard)">
                {{ $t('Edit') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { dashboardNameRulesAll } from "@/utils/rules";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      currentUser: "user/getCurrentUser",
      getDashboardName: "dashboards/getDashboardName"
    }),
    canEdit() {
      return this.dashboard.id !== this.currentUser._id;
    }
  },
  methods: {
    openDialog() {
      setTimeout(() => (this.editDashboardDialog = true));
    },
    async edit(dashboard) {
      if (this.valid) {
        let newname = this.newDashboardName;
        await this.$store.dispatch("renameDashboard", { dashboard, newname });
        this.$store.dispatch("ui/displaySnackbarMessage", this.$t("Dashboard has been edited"));
        this.editDashboardDialog = false;
      }
    }
  },
  mounted: function() {
    this.newDashboardName = this.getDashboardName(this.dashboard);
  }
};
</script>
