import Axios from "axios";
import store from "@/store";

import PeopleAPI from "./people";

const defaults = {
  baseURL: store.state.applicationConfiguration.baseUrl
};

function Api(config) {
  const instance = Axios.create(Object.assign({}, defaults, config));
  Object.assign(instance, PeopleAPI);

  return instance;
}

export { Api };
export default new Api();
