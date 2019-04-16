import axios from "axios";

export default class MemberClient {
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

  searchMembers(domainId, search) {
    return this.client({
      method: "GET",
      url: `/api/domains/${domainId}/members`,
      params: {
        search
      }
    }).then(({ data }) => data);
  }
}
