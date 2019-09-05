import axios from "axios";

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
    return this.client({
      method: "GET",
      url: `/linagora.esn.todo/api/todos`
    }).then(({ data }) => data || []);
  }
}
