<template>
  <v-list-tile :class="{ 'done': todo.done }">
    <v-list-tile-action>
      <v-checkbox v-model="done"></v-checkbox>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ todo.created_at | moment("from") }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: "TodoEntry",
  props: {
    todo: Object
  },
  methods: {
    updateDone(done) {
      this.$emit("done", { _id: this.todo._id, done });
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
}
</script>

<style lang="stylus" scoped>
.done {
  color: red
}
</style>
