<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-avatar size="36px">
        <img :src="item.author.avatar"/>
      </v-avatar>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="text">
        <a
          :href="`https://twitter.com/${item.author.screenName}`"
          target="_blank">@{{ item.author.displayName }}
        </a>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <span>{{ item.text }}</span>
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-list-tile-action-text>{{ item.date | moment("from") }}</v-list-tile-action-text>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: "Tweet",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.text {
  white-space: unset;
}
</style>
