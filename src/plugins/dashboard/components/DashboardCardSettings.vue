<template>
  <v-card>
    <v-card-title>
      <span class="headline">Settings</span>
    </v-card-title>
    <v-card-text>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <component :is="settings.component"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="$emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCardSettings",
  props: {
    settings: {
      type: Object,
      required: true
    },
     width: {
      type: String,
      default: "400px"
    }
  }
}
</script>
