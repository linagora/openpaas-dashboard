import Github from "./components/Github.vue";

const components = {
  main: { component: Github, title: "Github", columns: 2 }
};

const settings = {};

export default {
  title: "Github",
  type: "github",
  icon: "tools",
  description: "Display your Github feed",
  components,
  settings
};
