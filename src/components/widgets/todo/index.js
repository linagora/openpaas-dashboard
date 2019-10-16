import Main from "./components/Main.vue";
import store from "./store";

const components = {
  main: { component: Main, title: "Todo", columns: 2 }
};

const settings = {};

export default {
  title: "Todo",
  type: "linagora.esn.todo",
  icon: "check_box",
  description: "A simple Todo app",
  categories: ["todo", "openpaas"],
  store,
  components,
  settings
};
