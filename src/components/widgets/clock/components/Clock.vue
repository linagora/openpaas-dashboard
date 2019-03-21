<template>
  <div id="clock" class="pb-3">
    <div class="date">{{date}}</div>
    <div class="time">{{time}}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      date: null,
      time: null,
      timer: null
    };
  },
  mounted() {
    this.timer = setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = moment();

      this.date = now.format("LL");
      this.time = now.format("LTS");
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="stylus">
$clock_color = white;

#clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $clock_color;

  .date {
    font-size: 2em;
  }

  .time {
    font-size: 3em;
  }
}
</style>
