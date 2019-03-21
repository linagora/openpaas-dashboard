<template>
  <i class="icon" :class="iconClass" :style="{ fontSize: size }"></i>
</template>

<script>
export default {
  name: "WeatherIcon",
  props: {
    icon: {
      type: String,
      required: true,
      default: "01d"
    },
    size: {
      type: String,
      default: "8em"
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
  color: $font-color;
}
</style>
