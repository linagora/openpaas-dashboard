import store from "./store";
import Contact from "./components/Contact";

const components = [{ component: Contact, title: "Contacts" }];

export default {
  name: "contact",
  title: "Contact",
  description: "Search contacts",
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("resetContactState");
    }
  }
};
