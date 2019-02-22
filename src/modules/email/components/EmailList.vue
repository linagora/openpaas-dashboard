<template>
 <v-layout row>
    <v-flex shrink>
      <v-list three-line>
        <template v-for="(email, index) in emails">
          <v-list-tile avatar :key="email.id" class="email">
            <v-list-tile-avatar>
              <v-avatar class="red" :size="40">
                <span class="white--text headline">{{email.from.email[0].toUpperCase()}}</span>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-bind:class="{ unread: email.isUnread }" v-html="email.subject"></v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{email.from.email}} - {{email.date}}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="email.preview"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < emails.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
 </v-layout>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "EmailList",
  computed: {
    emails() {
      return this.$store.state.email.emails.list.slice().reverse();
    },
    ...mapGetters("session", { sessionReady: "ready" }),
  },
  async mounted() {
    await this.sessionReady;
    this.$store.dispatch('fetchLastEmails');
  }
};
</script>
<style scoped>
  .email {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .unread {
    font-weight: 800;
  }
</style>

