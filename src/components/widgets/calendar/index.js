import store from "./store";
import Calendar from "./components/Calendar";

const components = {
  main: { component: Calendar, title: "Calendar" }
};

export default {
  title: "Calendar",
  type: "calendar",
  icon: "today",
  description: "Quick view of your events",
  categories: ["calendar", "openpaas"],
  store,
  components,
  hooks: {
    onRemove: store => {
      store.dispatch("calendar/resetCalendarState");
    }
  }
};
