import EmailModule from "./email/index";
import CalendarModule from "./calendar/index";
import WeatherModule from "./weather/index";
import ContactModule from "./contact/index";
import MemberModule from "./member/index";
import ClockModule from "./clock/index";
import store from "@/store";

const modules = {};

export default {
  load,
  register,
  get,
  getAllDescription
};

function get(name) {
  return modules[name];
}

function getAllDescription() {
  return Object.entries(modules).map(entry => ({
    name: entry[1].name,
    title: entry[1].title,
    description: entry[1].description
  }));
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
  register(MemberModule);
  register(ClockModule);
}
