<template>
  <div>
    <v-list-tile data-test="dashboard-delete-trigger" @click="openDialog()">
      {{$t("Delete")}}
    </v-list-tile>
    <v-dialog v-model="deleteDashboardDialog" max-width="500px">
      <v-card data-test="dashboard-delete-dialog">
        <v-card-text class="headline" >
          {{ $t("Delete dashboard?") }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            data-test="dashboard-delete-dialog-cancel"
            color="primary"
            flat
            @click="deleteDashboardDialog = false"
          >
            {{$t("Cancel")}}
          </v-btn>
          <v-btn
            data-test="dashboard-delete-dialog-delete"
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
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({ currentUser: "user/getCurrentUser" })
  },
  methods: {
    openDialog() {
      setTimeout(() => (this.deleteDashboardDialog = true));
    },
    async remove(dashboard) {
      await this.$store.dispatch("removeDashboard", dashboard);
      this.deleteDashboardDialog = false;
      this.$router.push({ name: routeNames.DASHBOARD });
    }
  }
};
</script>
