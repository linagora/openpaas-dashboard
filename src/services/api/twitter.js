export default class Twitter {
  constructor(client) {
    this.client = client;
  }

  getMentions({ account_id, count = 400 }) {
    return this.client
      .get("/unifiedinbox.twitter/twitter/mentions", { params: { account_id, count } })
      .then(response => response.data);
  }
}
