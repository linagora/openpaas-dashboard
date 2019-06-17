import Main from "./components/Main.vue";
import Settings from "./components/Settings.vue";

const components = {
  main: { component: Main, title: "Tuleap projects" },
  settings: { component: Settings }
};

const settings = {
  data: {
    // TODO: Be able to get Tuleap API from services API
    url: "https://tuleap.net/"
  }
};

export default {
  title: "Tuleap projects",
  type: "tuleap",
  icon: "work_outline",
  description: "Display Tuleap projects",
  components,
  settings
};
