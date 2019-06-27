const Mixin = {
  methods: {
    getCategoryName(category) {
      const key = `category.${category}.name`;

      // eslint-disable-next-line vue-i18n/no-dynamic-keys
      return this.$te(key) ? this.$t(key) : category;
    }
  }
};

export default Mixin;
