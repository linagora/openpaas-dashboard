<template>
  <div>
    <v-list-tile avatar @click.stop="dialog = true">
      <v-list-tile-avatar>
        <people-avatar :email="email.from.email" :size="40"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-bind:class="{ unread: email.isUnread }">{{ email.subject || "No subject" }}</v-list-tile-title>
        <v-list-tile-sub-title>
          <span class='text--primary'>{{ email.from.email }}</span>&mdash;{{ email.preview }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-list-tile-action-text>{{ email.date | moment("from") }}</v-list-tile-action-text>
        <v-icon v-if="email.isFlagged" color="yellow darken-2">star</v-icon>
        <v-icon v-else color="grey lighten-1">star_border</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <email-view :email="email" @close="dialog = false"/>
    </v-dialog>
  </div>
</template>

<script>
import EmailView from "./EmailView.vue";
import PeopleAvatar from "@/components/PeopleAvatar";

export default {
  name: "EmailItem",
  data: () => ({
    dialog: false
  }),
  props: {
    email: Object
  },
  components: {
    EmailView,
    PeopleAvatar
  }
};
</script>

<style lang="stylus" scoped>
.unread {
  font-weight: 800;
}
</style>
