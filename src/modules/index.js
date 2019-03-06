import EmailModule from "./email/index";
import CalendarModule from "./calendar/index";
import WeatherModule from "./weather/index";
import ContactModule from "./contact/index";
import store from "@/store";

export default {
  load
};

function load(VueInstance) {
  store.registerModule("email", EmailModule.store);
  store.registerModule("calendar", CalendarModule.store);
  store.registerModule("weather", WeatherModule.store);
  store.registerModule("contact", ContactModule.store);

  EmailModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });

  CalendarModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });

  WeatherModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });

  ContactModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });
}
