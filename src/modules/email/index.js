import store from "./store";
import EmailList from "./components/EmailList";

const components = [{ component: EmailList, title: "Inbox" }];

export default {
  name: "email",
  title: "Email",
  description: "Check your last emails",
  store,
  components
};
