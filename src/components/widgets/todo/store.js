import uuid from "uuid";
import Vue from "vue";
import TodoClient from "./services/client";

const initialState = () => ({
  todos: {}
});

const types = {
  SET_TODOS: "SET_TODOS",
  ADD_TODO: "ADD_TODO"
};

const actions = {
  fetchTodos: ({ commit, rootState }) => {
    /*
    const client = new TodoClient(
      rootState.applicationConfiguration.baseUrl,
      rootState.session.jwtToken,
      rootState.user.user._id
    );

    return client
      .getTodos()
      .then(todos => commit(types.SET_TODOS, todos))
      .catch(err => console.error(err));
    */
    const todos = [
      {
        _id: uuid.v4(),
        title: "Buy 🍺",
        created_at: Date.now(),
        done: false
      }
    ];
    commit(types.SET_TODOS, todos);
  },

  createTodo: ({ commit }, { title }) => {
    commit(types.ADD_TODO, { _id: uuid.v4(), title, created_at: Date.now() });

    //return client
    //  .createTodo(todo)
    //  .then(result => commit(types.ADD_TODO, result))
    //  .catch(err => console.error(err));
  }
};

const mutations = {
  [types.SET_TODOS](state, todos) {
    todos.forEach(todo => Vue.set(state.todos, todo._id, todo));
  },

  [types.ADD_TODO](state, todo) {
    Vue.set(state.todos, todo._id, todo);
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
