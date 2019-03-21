<template>
  <v-card color="blue" class="white--text" hover raised>
    <v-card-title primary-title>
      <div>
        <div class="headline">{{card.title}}</div>
        <span>{{card.description}}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="add" flat dark depressed :disabled="!card.available">Add</v-btn>
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
