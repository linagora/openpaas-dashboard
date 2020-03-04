<template>  
  <div>
    <v-tour
      name="firstDashboardTour"
      :steps="firstSteps"
      :callbacks="firstTourCallbacks"
      :options="firstOptions"
    ></v-tour>
    <v-tour
      name="secondDashboardTour"
      :steps="secondSteps"
      :callbacks="secondTourCallbacks"
      :options="secondOptions"
    ></v-tour>
    <v-tour name="thirdDashboardTour" :steps="thirdSteps"></v-tour>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { routeNames } from "@/router";
import { FIRST_STEPS, SECOND_STEPS, THIRD_STEPS, FIRST_OPTIONS, SECOND_OPTIONS } from "../constants";
import { i18n } from "@/i18n";

export default {
  name: "dashboard-tour",
  data() {
    return {
      firstTourCallbacks: {
        onNextStep: this.dashboardTourFirstCounterCallback,
        onStop: this.dashboardTourFirstRedirectCallback
      },

      secondTourCallbacks: {
        onNextStep: this.dashboardTourSecondCounterCallback,
        onStop: this.dashboardTourSecondRedirectCallback
      },
      firstStepCounter: 0,
      secondStepCounter: 0
    };
  },
  mounted() {
    if (!this.isTourRun) {
      this.$nextTick(function() {
        setTimeout(() => {
          this.$tours["firstDashboardTour"].start();
          this.$store.dispatch("tour/updateTourComplited", true);
        }, 1000);
      });
    }
  },
  methods: {
    dashboardTourFirstCounterCallback(currentStep) {
      this.firstStepCounter = currentStep + 1;
    },
    dashboardTourFirstRedirectCallback() {
      if (this.firstStepCounter + 1 === this.firstSteps.length) {
        this.$router.push({ name: routeNames.STORE });
        setTimeout(() => this.$tours["secondDashboardTour"].start(), 1000);
      }
    },
    dashboardTourSecondCounterCallback(currentStep) {
      this.secondStepCounter = currentStep + 1;
    },
    dashboardTourSecondRedirectCallback() {
      if (this.secondStepCounter + 1 === this.secondSteps.length) {
        this.$router.push({ name: routeNames.HOME });
        setTimeout(() => this.$tours["thirdDashboardTour"].start(), 1000);
      }
    }
  },
  computed: {
    ...mapGetters({
      isTourRun: "tour/getTourComplited"
    }),

    firstSteps() {
      return FIRST_STEPS.map(step => {
        step.content = i18n.t(step.content);
        return step;
      });
    },

    secondSteps() {
      return SECOND_STEPS.map(step => {
        step.content = i18n.t(step.content);
        return step;
      });
    },

    thirdSteps() {
      return THIRD_STEPS.map(step => {
        step.content = i18n.t(step.content);
        return step;
      });
    },

    firstOptions() {
      return FIRST_OPTIONS;
    },

    secondOptions() {
      return SECOND_OPTIONS;
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === "Dashboard" && to.name === "Store") {
        this.$tours["firstDashboardTour"].stop();
      }
      if (from.name === "Store" && to.name === "Dashboard") {
        this.$tours["secondDashboardTour"].stop();
      }
    }
  },
  created() {
    this.$store.dispatch("tour/fetchTourComplited");
  }
};
</script>

<style lang="stylus" scoped>

</style>
