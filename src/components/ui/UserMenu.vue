<template>
  <v-menu bottom left offset-y data-test="user-menu">
    <v-avatar slot="activator" size="36">
      <img v-if="getAvatarUrl" :src="getAvatarUrl">
      <v-icon v-else>account_circle</v-icon>
    </v-avatar>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title data-test="user-menu-title">{{getDisplayName}}</v-list-tile-title>
        <v-list-tile-sub-title data-test="user-menu-email">{{getEmail}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile data-test="user-menu-logout" @click.prevent="logout">
        <v-list-tile-title>{{$t('Logout')}}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import { routeNames } from "@/router";

export default {
  name: "user-menu",
  methods: {
    logout() {
      return this.$store
        .dispatch("session/logout")
        .then(() => this.$router.push({ name: routeNames.LOGIN }))
        .catch(err => console.log("Error while logout", err));
    }
  },
  computed: {
    ...mapGetters({
      getAvatarUrl: "user/getAvatarUrl",
      getDisplayName: "user/getDisplayName",
      getEmail: "user/getEmail"
    })
  }
};
</script>
