import Clock from "./components/Clock.vue";

const components = {
  main: { component: Clock, color: "purple" }
};

export default {
  name: "clock",
  title: "Clock",
  icon: "access_time",
  description: "Display local time and date",
  components
};
