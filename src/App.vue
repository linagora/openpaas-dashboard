<template>
  <v-app id="app">
    <div v-if="$auth.ready()">
      <v-navigation-drawer
        :mini-variant="miniDrawer"
        v-model="drawer"
        fixed
        clipped
        hide-overlay
        app
      >
        <v-list-tile v-if="miniDrawer" @click.stop="miniDrawer = !miniDrawer">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list dense class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar size="44px">
                <img v-if="connectedUser" :src="getUserAvatarUrl">
                <v-icon v-else>account_circle</v-icon>
              </v-avatar>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ getDisplayName }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="miniDrawer = !miniDrawer">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar clipped-left app fixed color="white" v-if="$auth.check()">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapState({
      connectedUser: "user"
    }),
    ...mapGetters({
      getUserAvatarUrl: "user/getAvatarUrl",
      getDisplayName: "user/getDisplayName"
    }),
    miniDrawer: {
      set(mini) {
        this.$store.dispatch("ui/setMiniDrawer", mini);
      },
      get() {
        return this.$store.state.ui.miniDrawer;
      }
    }
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

<style lang="stylus">
  #header-logo
    height: 35px;
    width: 150px;
</style>
