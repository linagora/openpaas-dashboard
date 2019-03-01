<template>
  <i class="icon" :class="iconClass"></i>
</template>

<script>
export default {
  name: "WeatherIcon",
  props: {
    icon: {
      type: String,
      required: true,
      default: "01d"
    }
  },
  computed: {
    iconClass() {
      return `owi owi-${this.icon}`;
    }
  }
};
</script>

<style scoped lang="stylus">
@import "~open-weather-icons/dist/css/open-weather-icons.css"

$font-color = white;

.icon {
  font-size: 8em;
  color: $font-color;
}
</style>
