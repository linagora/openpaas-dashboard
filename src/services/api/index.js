import Axios from "axios";
import store from "@/store";

import PeopleAPI from "./people";
import DashboardAPI from "./dashboard";
import TwitterAPI from "./twitter";

const defaults = {
  baseURL: store.state.applicationConfiguration.baseUrl
};

class Api {
  constructor(config) {
    this.client = Axios.create(Object.assign({}, defaults, config));

    this.client.interceptors.request.use(config => {
      config.headers.Authorisation = `Bearer ${store.state.session.jwtToken}`;

      return config;
    });

    this.dashboard = new DashboardAPI(this.client);
    this.people = new PeopleAPI(this.client);
    this.twitter = new TwitterAPI(this.client);
  }
}

export { Api };
export default new Api();
