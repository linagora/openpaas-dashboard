<template>
 <v-layout row wrap id="email">
    <v-flex shrink v-if="emails && emails.length">
      <v-list three-line>
        <template v-for="(email, index) in emails">
          <email-item :email="email" :key="email.id"/>
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
import EmailItem from "./EmailItem.vue";

export default {
  name: "EmailList",
  data: () => ({
    timeout: null,
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
      this.$store.dispatch("email/fetchLastEmails").finally(() => this.$emit("loading", false));

      this.timeout = setTimeout(this.fetchLastEmails, this.delay);
    }
  },
  async mounted() {
    await this.sessionReady;
    this.fetchLastEmails();
  },
  destroyed() {
    this.timeout && clearTimeout(this.timeout);
  },
  components: {
    EmailItem
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
</style>
