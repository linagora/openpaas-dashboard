<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ item.title || $t("No title") }}
      </v-list-tile-title>
      <v-list-tile-sub-title>
        {{ item.contentSnippet }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-list-tile-action-text>{{ item.pubDate | moment("from") }}</v-list-tile-action-text>
      <v-btn flat icon color="grey" :href="item.link" target="_blank">
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: "FeedItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
