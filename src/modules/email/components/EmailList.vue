<template>
 <v-layout row wrap id="email">
    <v-flex shrink v-if="emails && emails.length">
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
    <div v-else id="no-emails">
      <v-icon color="primary" size="44px" dark>info</v-icon>
      <span class="pt-2 text-xs-center grey--text">No emails</span>
    </div>
 </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import PeopleAvatar from "@/components/PeopleAvatar";

export default {
  name: "EmailList",
  data: () => ({
    timer: null,
    delay: 30000
  }),
  computed: {
    emails() {
      return this.$store.state.email.emails.list.slice().reverse();
    },
    ...mapGetters("session", { sessionReady: "ready" })
  },
  methods: {
    fetchLastEmails() {
      this.$emit("loading", true);
      this.$store.dispatch("fetchLastEmails").finally(() => this.$emit("loading", false));

      setTimeout(this.fetchLastEmails, this.delay);
    }
  },
  async mounted() {
    await this.sessionReady;
    this.fetchLastEmails();
  },
  components: {
    PeopleAvatar
  }
};
</script>

<style scoped>
#email {
  min-height: 300px;
  max-height: 500px;
  overflow: auto;
}

#no-emails {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.unread {
  font-weight: 800;
}
</style>
