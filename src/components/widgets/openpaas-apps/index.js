import MainComponent from "./components/Main.vue";

const components = {
  main: { component: MainComponent, title: "OpenPaaS Applications" }
};

export default {
  title: "OpenPaaS Applications",
  type: "openpaas.apps",
  icon: "apps",
  description: "Display your OpenPaaS Applications",
  categories: ["tools", "openpaas"],
  components
};
