<template>
  <div>
    <v-text-field
      label="Add a todo"
      v-model="todo"
      v-on:keyup.enter="addTodo"
    ></v-text-field>
    <v-list subheader two-line>
      <entry :todo="todo" v-for="todo in todos" :key="todo._id" @done="updateDone"/>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Entry from "./Entry.vue";
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
    },
    updateDone(value) {
      this.$store.dispatch("linagora.esn.todo/updateDone", value);
    }
  },
  mounted() {
    this.$store.dispatch("linagora.esn.todo/fetchTodos");
  },
  components: {
    Entry
  }
};
</script>

<style lang="stylus" scoped>
.done {
  color: red
}
</style>
