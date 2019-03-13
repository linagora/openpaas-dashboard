import store from "./store";
import Calendar from "./components/Calendar";

const components = [{ id: "calendar", component: Calendar, title: "Calendar" }];

export default {
  name: "calendar",
  title: "Calendar",
  description: "Quick view of your events",
  store,
  components
};
