import store from "./store";
import EmailList from "./components/EmailList";

const components = [{ component: EmailList, title: "Inbox" }];

export default {
  name: "email",
  store,
  components
};
