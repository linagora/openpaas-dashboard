<template>
  <v-flex d-flex text-xs-center>
    <v-card class="pt-4 mx-auto" flat max-width="400">
      <v-card-text>
        <v-avatar size="88">
          <img :src="model.avatarUrl" class="mb-4"/>
        </v-avatar>
        <h4 class="headline mb-2">
          {{ model.displayName }}
        </h4>
        <div class="blue--text mb-2">{{ model.email }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-layout tag="v-card-text" text-xs-left wrap>
        <template v-if="model.org">
          <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Company</v-flex>
          <v-flex>{{model.org}}</v-flex>
        </template>
        <template v-if="model.emails && model.emails.length">
          <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Email</v-flex>
          <v-flex>
            <a :href="`mailto:${model.emails[0].value}`">{{ model.emails[0].value }}</a>
          </v-flex>
        </template>
        <template v-if="model.phone">
          <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
          <v-flex>{{ model.phone }}</v-flex>
        </template>
      </v-layout>
      </v-card>
</v-flex>
</template>

<script>
export default {
  name: "ContactDisplay",
  props: {
    model: {
      type: Object,
      required: true
    }
  }
};
</script>
