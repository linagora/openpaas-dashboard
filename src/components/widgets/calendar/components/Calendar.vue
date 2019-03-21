<template>
  <v-layout column id="calendar">
    <v-flex xs-12>
      <v-layout align-end justify-end>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab depressed small v-on:click="$refs.calendar.prev()">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </template>
          <span>Previous</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab depressed small v-on:click="today()">
              <v-icon>today</v-icon>
            </v-btn>
          </template>
          <span>Today</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab depressed small @click="$refs.calendar.next()">
              <v-icon>arrow_forward</v-icon>
            </v-btn>
          </template>
          <span>Next</span>
        </v-tooltip>
      </v-layout>
    </v-flex>
    <v-flex>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          type="day"
          :start="start"
          v-model="start"
          @moved="updateEvents"
        >
          <template slot="dayHeader" slot-scope="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu v-if="event.allDay" :key="event.uid" v-model="event.open" full-width offset-x>
                <div slot="activator" class="my-event" v-html="event.summary"></div>
                <v-card min-width="350px" flat>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0" v-html="event.summary"></h3>
                      <span>From {{event.startTime}} to {{event.endTime}}</span>
                    </div>
                  </v-card-title>
                </v-card>
              </v-menu>
            </template>
          </template>

          <template slot="dayBody" slot-scope="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <v-menu v-if="!event.allDay" :key="event.uid" v-model="event.open" full-width offset-x>
                <div
                  slot="activator"
                  :style="{ top: timeToY(event.startTime) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"
                  v-html="event.summary"
                ></div>
                <v-card min-width="350px" flat>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0" v-html="event.summary"></h3>
                      <span>From {{event.startTime}} to {{event.endTime}}</span>
                    </div>
                  </v-card-title>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Calendar",
  data: () => ({
    start: moment().format("YYYY-MM-DD")
  }),
  computed: {
    eventsMap() {
      const map = {};

      this.events.forEach(event => {
        const start = moment(event.start);
        const end = moment(event.end);

        const date = start.format("YYYY-MM-DD");
        const startTime = start.format("kk:mm");
        const endTime = end.format("kk:mm");
        const duration = moment.duration(end.diff(start)).asMinutes();

        // TODO: If the event is over several days and current date is between start and end date, add it to the map
        if (!map[date]) {
          map[date] = [];
        }

        map[date].push({
          uid: event.uid,
          open: false,
          summary: event.summary,
          allDay: event.allDay,
          date,
          startTime,
          endTime,
          start,
          end,
          duration,
          event
        });
      });

      return map;
    },
    events() {
      return this.$store.state.calendar.events.list.slice().reverse();
    },
    ...mapGetters("session", { sessionReady: "ready" })
  },
  async mounted() {
    const start = moment();
    const end = moment().add(1, "d");

    this.$refs.calendar.scrollToTime("07:30");
    await this.sessionReady;

    this.fetchEvents({ start, end });
  },
  methods: {
    updateEvents(event) {
      // FIXME: Start and end are wrong...
      const start = moment({year: event.year, month: event.month - 1, day: event.day}).subtract(1, "minutes");
      const end = moment({year: event.year, month: event.month - 1, day: event.day}).add(1, "d");

      this.fetchEvents({ start, end })
    },
    fetchEvents({ start, end }) {
      this.$emit("loading", true);
      this.$store.dispatch("fetchEvents", { start: `${start.format("YYYYMMDD")}T000000`, end: `${end.format("YYYYMMDD")}T000000` }).finally(() => this.$emit("loading", false));
    },
    today() {
      this.start = moment().format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
    width: 100%;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
</style>
