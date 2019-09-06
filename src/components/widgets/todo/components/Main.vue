<template>
  <div>
    <v-text-field
      label="Add a todo"
      v-model="todo"
      v-on:keyup.enter="addTodo"
    ></v-text-field>
    <v-list two-line dense>
      <todo
        v-for="todo in orderedTodos"
        :todo="todo"
        :key="todo._id"
        @done="updateDone"
        @remove="removeTodo"
      />
    </v-list>
  </div>
</template>

<script>
import { orderBy } from "lodash";
import { mapGetters } from "vuex";
import Todo from "./Todo.vue";
export default {
  name: "MainTodo",
  data: () => ({
    todo: ""
  }),
  computed: {
    ...mapGetters({
      todos: "linagora.esn.todo/getTodos"
    }),
    orderedTodos() {
      return orderBy(this.todos, "created_at", "desc");
    }
  },
  methods: {
    addTodo() {
      this.$store.dispatch("linagora.esn.todo/createTodo", { title: this.todo });
      this.todo = "";
    },
    updateDone(value) {
      this.$store.dispatch("linagora.esn.todo/updateDone", value);
    },
    removeTodo(_id) {
      this.$store.dispatch("linagora.esn.todo/removeTodo", _id);
    }
  },
  mounted() {
    this.$store.dispatch("linagora.esn.todo/fetchTodos");
  },
  components: {
    Todo
  }
};
</script>

<style lang="stylus" scoped>
.done {
  color: red
}
</style>
