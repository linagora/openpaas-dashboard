import EmailModule from "./email/index";
import CalendarModule from "./calendar/index";
import WeatherModule from "./weather/index";
import ContactModule from "./contact/index";
import store from "@/store";

const modules = {};

export default {
  load,
  register,
  get
};

function get(name) {
  return modules[name];
}

function register(module) {
  if (module.store) {
    store.registerModule(module.name, module.store);
  }

  modules[module.name] = module;
}

function load() {
  register(EmailModule);
  register(CalendarModule);
  register(WeatherModule);
  register(ContactModule);
}
