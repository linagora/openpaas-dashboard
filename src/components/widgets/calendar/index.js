import store from "./store";
import Calendar from "./components/Calendar";

const components = {
  main: { component: Calendar, title: "Calendar" }
};

export default {
  name: "calendar",
  icon: "today",
  title: "Calendar",
  description: "Quick view of your events",
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("resetCalendarState");
    }
  }
};
