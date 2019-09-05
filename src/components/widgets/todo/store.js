import uuid from "uuid";
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
        done: true
      }
    ];
    commit(types.SET_TODOS, todos);
  },

  createTodo: ({ commit }, { title }) => {
    commit(types.ADD_TODO, { _id: uuid.v4(), title, created_at: Date.now(), done: false });

    //return client
    //  .createTodo(todo)
    //  .then(result => commit(types.ADD_TODO, result))
    //  .catch(err => console.error(err));
  },

  updateDone: ({ commit }, { _id, done }) => {
    commit(types.UPDATE_DONE, { _id, done });
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
