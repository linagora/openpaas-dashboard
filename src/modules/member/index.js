import store from "./store";
import Member from "./components/Member";

const components = [{ component: Member, title: "Members" }];

export default {
  name: "member",
  title: "Members",
  description: "Search for platform members",
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("resetMemberState");
    }
  }
};
