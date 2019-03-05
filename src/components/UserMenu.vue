<template>
  <v-menu bottom left offset-y>
    <v-avatar slot="activator" size="36">
      <img :src="getAvatarUrl"/>
    </v-avatar>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title class="title">{{getDisplayName}}</v-list-tile-title>
        <v-list-tile-sub-title>{{getEmail}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile @click.prevent="logout">
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
      return this.$store.dispatch("session/logout").then(() => {
        this.$router.push({ name: routeNames.LOGIN });
      });
    },
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
