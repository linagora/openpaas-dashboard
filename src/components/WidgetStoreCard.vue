<template>
  <v-card>
    <v-card-title primary-title>
      <div v-if="card.icon" class="pr-2">
        <v-icon>{{card.icon}}</v-icon>
      </div>
      <div class="headline font-weight-bold">{{card.title}}</div>
    </v-card-title>
    <v-card-text>
      <span class="grey--text">{{card.description}}</span>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="add" color="primary" flat depressed :disabled="!card.available">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "WidgetStoreCard",
  props: {
    card: {
      type: Object
    }
  },
  methods: {
    add() {
      this.$emit("add");
    }
  }
};
</script>
