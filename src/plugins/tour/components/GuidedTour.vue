<template>
  <div id="tour">
      <v-dialog persistent v-model="showDialog" max-width="800px" :hide-overlay="e1 !== 0" persistant>
        <v-card v-if="e1 === 0">
          <v-card-title class="headline" primary-title>{{ $t("tour.welcome.title") }}</v-card-title>
          <v-card-text class="subheading">
            <p>{{ $t("tour.welcome.text1") }}</p>
            <p>{{ $t("tour.welcome.text2") }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat="flat" @click="cancel()">{{ $t("tour.button.no") }}</v-btn>
            <v-btn color="primary" flat="flat" @click="launchTour()">{{ $t("tour.button.yes") }}</v-btn>
          </v-card-actions>
        </v-card>
        <template v-else>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">{{ $t("tour.step.1.title") }}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">{{ $t("tour.step.2.title") }}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">{{ $t("tour.step.3.title") }}</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4">{{ $t("tour.step.4.title") }}</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card flat class="mb-2">
                <v-card-text class="subheading">
                  <p>{{ $t("tour.step.1.text1") }}</p>
                  <p>{{ $t("tour.step.1.text2") }}</p>
                  <p>{{ $t("tour.step.1.text3") }}</p>
                  <v-btn @click="showMenu()" small depressed>{{ $t("tour.step.1.button") }}</v-btn>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click="cancel()">{{ $t("tour.button.cancel") }}</v-btn>
                  <v-btn color="primary" flat @click="showStore()">{{ $t("tour.button.next") }}</v-btn>
                </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card flat class="mb-2">
                  <v-card-text class="subheading">
                    <p>{{ $t("tour.step.2.text1") }}</p>
                    <p>{{ $t("tour.step.2.text2") }}</p>
                  </v-card-text>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn flat @click="cancel()">{{ $t("tour.button.cancel") }}</v-btn>
                    <v-btn flat color="primary" @click="showDashboard()">{{ $t("tour.button.next") }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card flat class="mb-2">
                  <v-card-text class="subheading">
                    <p>{{ $t("tour.step.3.text1") }}</p>
                    <v-btn @click="showMenu()" small depressed>{{ $t("tour.step.3.button") }}</v-btn>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="cancel()">{{ $t("tour.button.cancel") }}</v-btn>
                    <v-btn color="primary" flat @click="showComplete()">{{ $t("tour.button.next") }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-card flat class="mb-2">
                  <v-card-text class="subheading">
                    <p>{{ $t("tour.step.4.text1") }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="complete()">{{ $t("tour.button.done") }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </template>
      </v-dialog>
  </div>
</template>

<script>
import { routeNames } from "@/router";

export default {
  name: "GuidedTour",
  data: () => ({
    showTour: false,
    e1: 0
  }),
  props: {
    show: {
      type: Boolean
    }
  },
  methods: {
    showMenu() {
      document.querySelector("#sidebar-menu-button") && document.querySelector("#sidebar-menu-button").click();
    },
    cancel() {
      this.setComplete();
      this.$emit("skip");
    },
    setComplete() {
      this.$store.dispatch("tour/setCompleted", true);
    },
    launchTour() {
      this.$router.push({ name: routeNames.HOME });
      this.e1 = 1;
    },
    showStore() {
      this.e1 = 2;
      this.$router.push({ name: routeNames.STORE });
    },
    showDashboard() {
      this.e1 = 3;
      this.$router.push({ name: routeNames.HOME });
    },
    showComplete() {
      this.e1 = 4;
    },
    complete() {
      this.setComplete();
      this.$emit("complete");
    }
  },
  watch: {
    $route(to, from) {
      if (
        this.e1 === 1 &&
        (from.name === routeNames.DASHBOARD || from.name === routeNames.HOME) &&
        to.name === routeNames.STORE
      ) {
        // user comes from the home but clicked on the menu item and not on the tour "next"
        this.showStore();
      }
      if (
        this.e1 === 2 &&
        from.name === routeNames.STORE &&
        (to.name === routeNames.HOME || to.name === routeNames.DASHBOARD)
      ) {
        // user comes from the store but clicked on the back button and not on the tour "next"
        this.showDashboard();
      }
    }
  },
  computed: {
    showDialog() {
      return this.show;
    }
  }
};
</script>
