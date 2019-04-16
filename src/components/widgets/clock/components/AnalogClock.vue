<template>
  <div class="clock">
    <div class="outer-clock-face">
      <div class="marking marking-one"></div>
      <div class="marking marking-two"></div>
      <div class="marking marking-three"></div>
      <div class="marking marking-four"></div>
      <div class="inner-clock-face">
        <div class="hand hour-hand" :style="hoursStyle"></div>
        <div class="hand min-hand" :style="minutesStyle"></div>
        <div class="hand second-hand" :style="secondsStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnalogClock",
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  computed: {
    hoursStyle() {
      return {
        transform: `rotate(${this.hoursDegrees}deg)`
      };
    },
    secondsStyle() {
      return {
        transform: `rotate(${this.secondsDegrees}deg)`
      };
    },
    minutesStyle() {
      return {
        transform: `rotate(${this.minutesDegrees}deg)`
      };
    },
    secondsDegrees() {
      return (this.date.getSeconds() / 60) * 360 + 90;
    },
    minutesDegrees() {
      return (this.date.getMinutes() / 60) * 360 + (this.date.getSeconds() / 60) * 6 + 90;
    },
    hoursDegrees() {
      return (this.date.getHours() / 12) * 360 + (this.date.getMinutes() / 60) * 30 + 90;
    }
  }
};
</script>

<style scoped lang="stylus">

$clock-border-color = #545271;
$clock-hand-color = #545271;
$clock-background-color = #fff;
$clock-marking-color = #b8b8c5;
$clock-marking-color_1 = #bdbdcb;
$clock-center-color = #4d4b63;
$clock-size = 20rem;

.clock {
  width: $clock-size;
  height: $clock-size;
  border: 3px solid $clock-border-color;
  border-radius: 50%;
  margin: 50px auto;
  position: relative;
  padding: 1rem;
  background: $clock-border-color;
}

.outer-clock-face {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: $clock-background-color;
  overflow: hidden;
}

.outer-clock-face::after {
  transform: rotate(90deg)
}

.outer-clock-face::before,
.outer-clock-face::after,
.outer-clock-face .marking {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  background: $clock-marking-color;
  z-index: 0;
  left: 49%;
}

.outer-clock-face .marking {
  background: $clock-marking-color_1;
  width: 3px;
}

.outer-clock-face .marking.marking-one {
  transform: rotate(30deg)
}

.outer-clock-face .marking.marking-two {
  transform: rotate(60deg)
}

.outer-clock-face .marking.marking-three {
  transform: rotate(120deg)
}

.outer-clock-face .marking.marking-four {
  transform: rotate(150deg)
}

.inner-clock-face {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: $clock-background-color;
  border-radius: 100%;
  z-index: 1;
}

.inner-clock-face::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  border-radius: 18px;
  margin-left: -9px;
  margin-top: -6px;
  background: $clock-center-color;
  z-index: 11;
}

.hand {
  width: 50%;
  right: 50%;
  height: 6px;
  background: $clock-hand-color;
  position: absolute;
  top: 50%;
  border-radius: 6px;
  transform-origin: 100%;
  transform: rotate(90deg);
  transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}

.hand.hour-hand {
  width: 25%;
  z-index: 3;
}

.hand.min-hand {
  height: 3px;
  z-index: 10;
  width: 40%;
}

.hand.second-hand {
  height: 2px;
  width: 40%;
}
</style>
