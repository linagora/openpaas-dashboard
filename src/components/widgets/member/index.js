import store from "./store";
import Member from "./components/Member";

const components = {
  main: { component: Member, title: "Members" }
};

export default {
  title: "Members",
  type: "member",
  icon: "account_circle",
  description: "Search for platform members",
  categories: ["contact", "openpaas"],
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("member/resetMemberState");
    }
  }
};
