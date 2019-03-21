<template>
  <v-flex d-flex text-xs-center>
    <v-card class="pt-4 mx-auto" flat max-width="400">
      <v-card-text>
        <people-avatar class="mb-4" :email="model.preferredEmail" :size="88" :types="types"/>
        <h4 class="headline mb-2">
          {{ model.displayName }}
        </h4>
        <div class="blue--text mb-2">{{ model.preferredEmail }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-layout tag="v-card-text" text-xs-left wrap>
        <template v-if="model.office_location">
          <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Location</v-flex>
          <v-flex>{{model.office_location}}</v-flex>
        </template>
        <template v-if="model.main_phone">
          <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone</v-flex>
          <v-flex>{{ model.main_phone }}</v-flex>
        </template>
      </v-layout>
      </v-card>
</v-flex>
</template>

<script>
import PeopleAvatar from "@/components/PeopleAvatar.vue";

export default {
  name: "MemberDisplay",
  data() {
    return {
      types: ["user"]
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  components: {
    PeopleAvatar
  }
};
</script>
