import store from "./store";
import Member from "./components/Member";

const components = {
  main: { component: Member, title: "Members" }
};

export default {
  name: "member",
  title: "Members",
  icon: "account_circle",
  description: "Search for platform members",
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("resetMemberState");
    }
  }
};
