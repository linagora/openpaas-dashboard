import store from "@/store";

export default {
  load,
  register,
  get,
  getAllDescription
};

const modules = {};

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
  const requireComponent = require.context("./components/widgets", true, /index.js$/);

  requireComponent.keys().forEach(fileName => register(requireComponent(fileName).default));
}
