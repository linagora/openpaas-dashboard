import Vue from "vue";
import TodoClient from "./services/client";

const initialState = () => ({
  todos: {}
});

const types = {
  SET_TODOS: "SET_TODOS",
  ADD_TODO: "ADD_TODO",
  UPDATE_DONE: "UPDATE_DONE"
};

const actions = {
  fetchTodos: ({ commit, rootState }) => {
    const client = new TodoClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return client
      .getTodos()
      .then(todos => todos || [])
      .then(todos =>
        todos.map(todo => {
          todo.done = todo.status === "done";
          return todo;
        })
      )
      .then(todos => commit(types.SET_TODOS, todos))
      .catch(err => console.error(err));
  },

  createTodo: ({ commit, rootState }, { title }) => {
    const client = new TodoClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return client
      .createTodo({ title })
      .then(result => {
        result.done = result.status === "done";
        commit(types.ADD_TODO, result);
      })
      .catch(err => console.error(err));
  },

  updateDone: ({ commit, rootState }, { _id, done }) => {
    const client = new TodoClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    const status = done ? "done" : "open";

    return client
      .updateTodo({ _id, status })
      .then(() => commit(types.UPDATE_DONE, { _id, done }))
      .catch(err => console.error(err));
  }
};

const mutations = {
  [types.SET_TODOS](state, todos) {
    todos.forEach(todo => Vue.set(state.todos, todo._id, todo));
  },

  [types.ADD_TODO](state, todo) {
    Vue.set(state.todos, todo._id, todo);
  },

  [types.UPDATE_DONE](state, { _id, done }) {
    state.todos[_id].done = done;
    Vue.set(state.todos, _id, state.todos[_id]);
  }
};

const getters = {
  getTodos: state => Object.values(state.todos)
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
};
