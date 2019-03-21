<template>
  <section>
    <div class="cloudiness">
      <img src="@/components/widgets/weather/assets/icons/cloud.svg" alt="cloudiness">
      <span class="cloudiness__value">{{ cloudiness }} &percnt;</span>
    </div>
    <div class="wind-speed">
      <img src="@/components/widgets/weather/assets/icons/wind.svg" alt="wind speed">
      <span class="wind__value">{{ windSpeed }} m/s</span>
    </div>
    <div class="humidity">
      <img src="@/components/widgets/weather/assets/icons/humidity.svg" alt="humidity">
      <span class="humidity__value">{{ humidity }}&percnt;</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Measurements",
  props: {
    cloudiness: {
      type: Number,
      required: true
    },
    windSpeed: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="stylus">
$temperature_color_secondary = rgba(255, 255, 255, 0.75);
$image_size = 42px;

section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

span {
  color: $temperature_color_secondary;
  font-weight: 400;
}

img {
  width: $image_size;
  height: $image_size;
  vertical-align: middle;
}
</style>
