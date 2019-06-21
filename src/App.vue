<template>
  <v-app id="app" data-test="app">
    <div v-if="$auth.ready()" :style="{ backgroundColor: backgroundColor }" id="app-ready">
      <v-navigation-drawer v-model="drawer" fixed clipped hide-overlay app v-if="$auth.check()">
        <sidebar></sidebar>
      </v-navigation-drawer>
      <v-toolbar clipped-left app fixed color="blue" :dark="true" v-if="$auth.check()">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title style="max-width: 300px" class="ml-0 pl-3 hidden-sm-and-down">
          <img class="hidden-sm-and-down" id="header-logo" src="@/assets/logo.svg"/>
        </v-toolbar-title>
        <div id="search">
          <search-header/>
        </div>
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
import { theme } from "@/style";
import UserMenu from "@/components/ui/UserMenu.vue";
import Snackbar from "@/components/ui/Snackbar.vue";
import Sidebar from "@/components/ui/Sidebar.vue";
import SearchHeader from "@/components/ui/SearchHeader.vue";

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    backgroundColor() {
      if (!this.$auth.check()) {
        return theme.colors.blue.base;
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
    Snackbar,
    Sidebar,
    SearchHeader
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

  #search
    display: flex
    flex-grow: 1
    justify-content: center
</style>
