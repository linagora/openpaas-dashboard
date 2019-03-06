<template>
  <main>
    <measurements
      :cloudiness="weather.cloudiness"
      :windSpeed="weather.windSpeed"
      :humidity="weather.humidity"
    ></measurements>

    <div class="middle">
      <weather-icon class="pa-2" :icon="weather.icon"/>
      <temperature class="pa-2"
        :value="weather.temperatureValue"
        :high="weather.temperatureHigh"
        :low="weather.temperatureLow"
      ></temperature>
    </div>

    <weather-info
      :location="weather.location"
      :description="weather.description"
      :icon="weather.icon"
    ></weather-info>

    <weather-forecast class="pa-4" :forecast="forecast"/>
  </main>
</template>

<script>
import WeatherIcon from "./WeatherIcon";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import Temperature from "./Temperature";
import Measurements from "./Measurements";

export default {
  name: "Weather",
  mounted() {
    this.fetchWeather();
  },
  computed: {
    weather() {
      return this.$store.state.weather.current;
    },
    forecast() {
      return this.$store.state.weather.forecast;
    }
  },
  methods: {
    fetchWeather() {
      this.$store.dispatch("fetchWeather")
      this.$store.dispatch("fetchForecast")
    }
  },
  components: {
    WeatherIcon,
    WeatherInfo,
    WeatherForecast,
    Temperature,
    Measurements
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.middle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>