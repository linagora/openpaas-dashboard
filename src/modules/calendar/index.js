import store from "./store";
import Calendar from "./components/Calendar";

const components = [{ id: "calendar", component: Calendar, title: "Calendar" }];

export default {
  name: "calendar",
  store,
  components
};
