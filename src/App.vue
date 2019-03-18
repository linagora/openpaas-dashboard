<template>
  <v-app id="app">
    <div v-if="$auth.ready()" :style="{ backgroundColor: backgroundColor }" id="app-ready">
      <v-toolbar clipped-left app fixed color="blue" v-if="$auth.check()">
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <img class="hidden-sm-and-down" id="header-logo" src="@/assets/logo.svg"/>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <user-menu v-if="connectedUser"/>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
    </div>
    <div v-else id="progress">
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
    <snackbar/>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import UserMenu from "@/components/UserMenu.vue";
import Snackbar from "@/components/Snackbar.vue";
import colors from "vuetify/es5/util/colors";

export default {
  data: () => ({}),
  computed: {
    backgroundColor() {
      if (!this.$auth.check()) {
        return colors.blue.base;
      }
    },
    ...mapState({
      connectedUser: "user"
    }),
    ...mapGetters({
      getUserAvatarUrl: "user/getAvatarUrl",
      getDisplayName: "user/getDisplayName"
    })
  },
  components: {
    UserMenu,
    Snackbar
  },
  created() {
    this.$auth.ready(() => {
      this.$store.dispatch("user/fetchUser");
    });
  }
};
</script>

<style lang="stylus" scoped>
  #app #app-ready
    height: 100vh;

  #app-ready
    transition .4s

  #header-logo
    height: 35px;
    width: 150px;

  .container {
    padding: 0;
  }

  #progress {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
