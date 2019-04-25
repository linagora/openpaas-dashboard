class Registry {
  constructor(vuexInstance) {
    this.vuexInstance = vuexInstance;
    this.modules = {};
  }

  get(type) {
    return this.modules[type];
  }

  getAllDescription() {
    return Object.entries(this.modules).map(entry => ({
      type: entry[1].type,
      title: entry[1].title,
      icon: entry[1].icon,
      description: entry[1].description,
      components: entry[1].components
    }));
  }

  register(module) {
    if (!module) {
      throw new Error("Module is required");
    }

    if (!module.type) {
      throw new Error("Module type is required");
    }

    if (module.store) {
      this.vuexInstance.registerModule(module.type, module.store);
    }

    this.modules[module.type] = module;
  }
}

export default Registry;
