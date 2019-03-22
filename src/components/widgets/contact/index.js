import store from "./store";
import Contact from "./components/Contact";

const components = {
  main: { component: Contact, title: "Contacts" }
};

export default {
  name: "contact",
  title: "Contact",
  icon: "account_circle",
  description: "Search contacts",
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("resetContactState");
    }
  }
};
