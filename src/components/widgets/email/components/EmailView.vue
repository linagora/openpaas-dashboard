<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ getSubject }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-title primary-title>
      <div class="email-header">
        <div class="title">{{ getSubject }}</div>
        <div class="from">
          <v-chip>
            <people-avatar :email="email.from.email"/>
            {{ email.from.email }}
          </v-chip>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="body">
        <span v-html="email.htmlBody"></span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import PeopleAvatar from "@/components/PeopleAvatar";

export default {
  name: "EmailView",
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  computed: {
    getSubject() {
      return this.email.subject || "No subject";
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  components: {
    PeopleAvatar
  }
};
</script>

<style scoped lang="stylus">
.email-header {
  display: flex;
  flex-direction: column;

  .title {
    padding: 8px;
  }
}

.body >>> blockquote {
  color: #555;
  border-left: 5px solid #DDD;
  padding-left: 5px;
}
</style>


