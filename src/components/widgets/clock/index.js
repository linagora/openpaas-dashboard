import Clock from "./components/Clock.vue";

const components = {
  main: { component: Clock, color: "purple" }
};

const settings = {
  data: {
    displayDate: true
  }
};

export default {
  title: "Clock",
  type: "clock",
  icon: "access_time",
  description: "Display local time and date",
  categories: ["clock"],
  components,
  settings
};
