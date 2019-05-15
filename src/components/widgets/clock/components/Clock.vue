<template>
  <div class="pb-3 clock">
    <span class="date headline white--text">{{dateString}}</span>
    <analog-clock v-if="date" :date="date"/>
  </div>
</template>

<script>
import moment from "moment";
import AnalogClock from "./AnalogClock.vue";

export default {
  data() {
    return {
      date: null,
      dateString: null,
      timer: null
    };
  },
  mounted() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      this.date = new Date();
      this.dateString = moment(this.date).format("LL");
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  components: {
    AnalogClock
  }
};
</script>
<style scoped lang="stylus">
$clock_color = white;

.clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $clock_color;
}
</style>
