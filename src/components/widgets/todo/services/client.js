import axios from "axios";
const PATH = "/linagora.esn.todo/api/todos";

export default class CalendarClient {
  constructor(baseUrl, jwtToken, userId) {
    this.baseUrl = baseUrl;
    this.client = this._createClient(baseUrl, jwtToken);
    this.userId = userId;
  }

  _createClient(baseURL, jwtToken) {
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  }

  getTodos() {
    return this.client.get(PATH).then(({ data }) => data || []);
  }

  createTodo(todo) {
    return this.client.put(PATH, todo).then(({ data }) => data || []);
  }

  updateTodo({ _id, status }) {
    return this.client.patch(`${PATH}/${_id}/`, { status }).then(({ data }) => data || []);
  }

  removeTodo(_id) {
    return this.client.delete(`${PATH}/${_id}`).then(({ data }) => data || {});
  }
}
