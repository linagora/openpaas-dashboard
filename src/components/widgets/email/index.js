import store from "./store";
import Email from "./components/Email";

const components = {
  main: { component: Email, title: "Inbox", columns: 2 }
};

export default {
  title: "Email",
  type: "email",
  icon: "mail_outline",
  description: "Check your last emails",
  categories: ["email", "openpaas"],
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("email/resetEmailState");
    }
  }
};
