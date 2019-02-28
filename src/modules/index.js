import EmailModule from "./email/index";
import CalendarModule from "./calendar/index";
import store from "@/store";

export default {
  load
};

function load(VueInstance) {
  store.registerModule("email", EmailModule.store);
  store.registerModule("calendar", CalendarModule.store);

  EmailModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });

  CalendarModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });
}
