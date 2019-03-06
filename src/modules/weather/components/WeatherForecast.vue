<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex pa-2 v-for="day in forecast" :key="day.dt_txt">
        <v-layout column align-center>
          <v-flex pa-2>
            <weather-icon :icon="day.icon" size="2em"/>
          </v-flex>
          <v-flex pa-2>
            <span class="day">{{ new Date(day.dt_txt).toLocaleString($t('locale'), { weekday: 'short' }) }}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import WeatherIcon from "./WeatherIcon";

export default {
  name: "WeatherForecast",
  props: {
    forecast: {
      type: Array
    }
  },
  components: {
    WeatherIcon
  }
}
</script>

<style scoped lang="stylus">
$font-color = white;

.day {
  color: $font-color;
}
</style>

