<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-checkbox v-model="done"></v-checkbox>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title class="title" :class="{ 'done' : todo.done }">{{ todo.title }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ todo.created_at | moment("from") }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon ripple @click="remove">
        <v-icon color="grey lighten-1">clear</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: Object
  },
  methods: {
    updateDone(done) {
      this.$emit("done", { _id: this.todo._id, done });
    },
    remove() {
      this.$emit("remove", this.todo._id);
    }
  },
  computed: {
    done: {
      get() {
        return this.todo.done;
      },
      set(done) {
        this.updateDone(done);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.done {
  text-decoration: line-through
}
</style>
