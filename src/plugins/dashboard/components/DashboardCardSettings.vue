<template>
  <v-card>
    <v-card-title>
      <span class="headline">Settings</span>
      <v-spacer/>
      <v-btn icon @click="close()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <component :is="view" :settings="settings" @updated="updateSettings"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCardSettings",
  props: {
    card: {
      type: Object,
      required: true
    },
    settings: {
      // the settings hash
      type: Object,
      required: true
    },
    view: {
      // The Vue component to display
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: "400px"
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updateSettings(settings) {
      this.$store.dispatch("updateCardSettings", { card: this.card, settings });
      this.close();
    }
  }
};
</script>
