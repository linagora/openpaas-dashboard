import store from "./store";
import Contact from "./components/Contact";

const components = [{ component: Contact, title: "Contacts" }];

export default {
  name: "contact",
  store,
  components
};
