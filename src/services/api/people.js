export default class People {
  constructor(client) {
    this.client = client;
  }

  searchPeople(query) {
    return this.client.post("/api/people/search", query);
  }
}
