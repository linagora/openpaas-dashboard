<template>
  <v-app id="app">
    <div v-if="$auth.ready()">
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
    <div v-else>
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
    <snackbar/>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import UserMenu from "@/components/UserMenu.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  data: () => ({}),
  computed: {
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
  #header-logo
    height: 35px;
    width: 150px;

  .container {
    padding: 0;
  }
</style>
