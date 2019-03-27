import store from "./store";
import Email from "./components/Email";

const components = {
  main: { component: Email, title: "Inbox" }
};

export default {
  name: "email",
  title: "Email",
  icon: "mail_outline",
  description: "Check your last emails",
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("resetEmailState");
    }
  }
};
