<template>
 <v-layout row>
    <v-flex shrink>
      <v-list three-line>
        <template v-for="(email, index) in emails">
          <v-list-tile avatar :key="email.id">
            <v-list-tile-avatar>
              <people-avatar :email="email.from.email" :size="40"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-bind:class="{ unread: email.isUnread }">{{ email.subject || "No subject" }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <span class='text--primary'>{{email.from.email}}</span>&mdash;{{email.preview}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>{{email.date | moment("from")}}</v-list-tile-action-text>
              <v-icon v-if="email.isFlagged" color="yellow darken-2">star</v-icon>
              <v-icon v-else color="grey lighten-1">star_border</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="index + 1 < emails.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
 </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import PeopleAvatar from "@/components/PeopleAvatar";

export default {
  name: "EmailList",
  computed: {
    emails() {
      return this.$store.state.email.emails.list.slice().reverse();
    },
    ...mapGetters("session", { sessionReady: "ready" })
  },
  async mounted() {
    await this.sessionReady;
    this.$store.dispatch("fetchLastEmails");
  },
  components: {
    PeopleAvatar
  }
};
</script>
<style scoped>
.unread {
  font-weight: 800;
}
</style>
