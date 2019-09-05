<template>
  <div>
    <v-text-field
      label="Add a todo"
      v-model="todo"
      v-on:keyup.enter="addTodo"
    ></v-text-field>
    <v-list subheader two-line>
      <v-list-tile v-for="todo in todos" :key="todo._id" :class="{ 'done': todo.done }">
        <v-list-tile-action>
          <v-checkbox v-model="todo.done"></v-checkbox>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ todo.created_at | moment("from") }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Todo",
  data: () => ({
    todo: ""
  }),
  computed: {
    ...mapGetters({
      todos: "linagora.esn.todo/getTodos"
    })
  },
  methods: {
    addTodo() {
      this.$store.dispatch("linagora.esn.todo/createTodo", { title: this.todo });
      this.todo = "";
    }
  },
  mounted() {
    this.$store.dispatch("linagora.esn.todo/fetchTodos");
  }
};
</script>

<style lang="stylus" scoped>
.done {
  color: red
}
</style>
