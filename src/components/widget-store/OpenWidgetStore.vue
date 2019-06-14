<template>
  <div>
    <v-list-tile data-test="dashboard-open-store" @click="openDialog()">
      {{$t("Add a new widget")}}
    </v-list-tile>
    <v-dialog v-model="dialog" scrollable max-width="1200px">
      <widget-store :dashboard="dashboard" @close="closeDialog()"/>
    </v-dialog>
  </div>
</template>

<script>
import WidgetStore from "./WidgetStore.vue";

export default {
  name: "OpenWidgetStore",
  data: () => ({
    dialog: false
  }),
  props: {
    dashboard: {
      type: Object,
      required: true
    }
  },
  methods: {
    openDialog() {
      setTimeout(() => (this.dialog = true));
    },
    closeDialog() {
      this.dialog = false;
    }
  },
  components: {
    WidgetStore
  }
};
</script>
