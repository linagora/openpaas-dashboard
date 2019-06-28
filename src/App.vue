<template>
  <v-app id="app" data-test="app">
    <div v-if="$auth.ready()"
      :style="{ backgroundColor: backgroundColor, height: !$auth.check() ? '100vh': '' }"
      id="app-ready"
    >
      <v-navigation-drawer v-model="drawer" fixed clipped hide-overlay app v-if="$auth.check()">
        <router-view name="sidebar"/>
      </v-navigation-drawer>
      <v-toolbar v-if="$auth.check()" ref="toolbar" clipped-left app fixed color="blue" dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title style="max-width: 300px" class="ml-0 pl-3 hidden-sm-and-down">
          <img class="hidden-sm-and-down" id="header-logo" src="@/assets/logo.svg"/>
        </v-toolbar-title>
        <div id="search">
          <search-header/>
        </div>
        <user-menu v-if="connectedUser"/>
        <template v-slot:extension v-if="showToolbarExtension">
          <portal-target name="toolbar-extension"></portal-target>
        </template>
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
    }),
    showToolbarExtension() {
      // dirty hack to avoid to empty a portal-target with empty element
      // which displays the toolbar extension slot without content
      return this.$route.meta && this.$route.meta.showToolbarExtension;
    }
  },
  components: {
    UserMenu,
    Snackbar,
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

  .vue-portal-target
    display: flex
    flex-grow: 1
</style>
