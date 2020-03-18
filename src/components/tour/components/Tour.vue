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
    <v-tour name="thirdDashboardTour" :steps="thirdSteps" :options="thirdOptions"></v-tour>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { routeNames } from "@/router";
import { FIRST_STEPS, SECOND_STEPS, THIRD_STEPS, FIRST_OPTIONS, SECOND_OPTIONS, THIRD_OPTIONS } from "../constants";
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
      FIRST_OPTIONS.labels.buttonSkip = i18n.t(FIRST_OPTIONS.labels.buttonSkip);
      FIRST_OPTIONS.labels.buttonPrevious = i18n.t(FIRST_OPTIONS.labels.buttonPrevious);
      FIRST_OPTIONS.labels.buttonNext = i18n.t(FIRST_OPTIONS.labels.buttonNext);
      FIRST_OPTIONS.labels.buttonStop = i18n.t(FIRST_OPTIONS.labels.buttonStop);
      return FIRST_OPTIONS;
    },

    secondOptions() {
      SECOND_OPTIONS.labels.buttonSkip = i18n.t(SECOND_OPTIONS.labels.buttonSkip);
      SECOND_OPTIONS.labels.buttonPrevious = i18n.t(SECOND_OPTIONS.labels.buttonPrevious);
      SECOND_OPTIONS.labels.buttonNext = i18n.t(SECOND_OPTIONS.labels.buttonNext);
      SECOND_OPTIONS.labels.buttonStop = i18n.t(SECOND_OPTIONS.labels.buttonStop);
      return SECOND_OPTIONS;
    },

    thirdOptions() {
      THIRD_OPTIONS.labels.buttonSkip = i18n.t(THIRD_OPTIONS.labels.buttonSkip);
      THIRD_OPTIONS.labels.buttonPrevious = i18n.t(THIRD_OPTIONS.labels.buttonPrevious);
      THIRD_OPTIONS.labels.buttonNext = i18n.t(THIRD_OPTIONS.labels.buttonNext);
      THIRD_OPTIONS.labels.buttonStop = i18n.t(THIRD_OPTIONS.labels.buttonStop);
      return THIRD_OPTIONS;
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

<style lang="stylus">
#v-step-bd59eb18 {
  top: -50px !important;
  left: 320px !important;
}

#v-step-3d83d1aa {
  left: 320px !important;
}
</style>
