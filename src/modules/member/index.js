import store from "./store";
import Member from "./components/Member";

const components = [{ component: Member, title: "Members" }];

export default {
  name: "member",
  store,
  components
};
