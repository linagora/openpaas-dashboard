class Widgets {
  constructor(vuexInstance) {
    this.vuexInstance = vuexInstance;
    this.modules = {};
  }

  get(name) {
    return this.modules[name];
  }

  getAllDescription() {
    return Object.entries(this.modules).map(entry => ({
      name: entry[1].name,
      title: entry[1].title,
      icon: entry[1].icon,
      description: entry[1].description
    }));
  }

  register(module) {
    if (module.store) {
      this.vuexInstance.registerModule(module.name, module.store);
    }

    this.modules[module.name] = module;
  }
}

export default Widgets;
