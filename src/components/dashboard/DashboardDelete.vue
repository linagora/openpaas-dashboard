<template>
  <v-dialog 
    v-model="deleteDashboardDialog" 
    width="300"
  >
    <template v-slot:activator="{ on }">
      <v-list-tile-title
        v-on="on"
      >
        {{$t("Remove")}}
      </v-list-tile-title>
    </template>
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
</template>

<script>
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
    remove(dashboard) {
      this.$store.dispatch("removeDashboard", dashboard);
      this.deleteDashboardDialog = false;
    }
  }
};
</script>
