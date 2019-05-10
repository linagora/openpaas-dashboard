<template>
  <div id="feed">
    <v-layout row wrap v-if="lastItems && lastItems.length">
      <v-flex shrink>
        <v-list three-line>
          <template v-for="(item, index) in lastItems">
            <feed-item :item="item" :key="item.id"/>
            <v-divider v-if="index + 1 < lastItems.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { fetch } from "../services/rss";
import FeedItem from "./FeedItem.vue";

export default {
  name: "Feed",
  mounted() {
    this.fetchFeed();
  },
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    delay: 60 * 1000, // TODO: Make it configurable
    limit: 5, // TODO: Make it configurable
    timeout: null,
    feed: null
  }),
  computed: {
    lastItems() {
      return this.feed && this.feed.items ? this.feed.items.slice(0, this.limit) : null;
    }
  },
  methods: {
    fetchFeed() {
      if (!this.settings.url) {
        console.log("Feed URL is empty");
        return;
      }

      console.log("Fetching feed", this.settings.url);
      this.$emit("loading", true);

      fetch(this.settings.url)
        .then(feed => {
          // TODO: order items by date
          // TODO: limit nb of items
          this.feed = feed;
          this.$emit("updateTitle", this.feed.title);
        })
        .catch(err => console.log("err", err))
        .finally(() => this.$emit("loading", false));

      this.timeout = setTimeout(this.fetchFeed, this.delay);
    },
    clear() {
      this.timeout && clearTimeout(this.timeout);
      this.feed = null;
      this.$emit("updateTitle", null);
    }
  },
  watch: {
    settings(newValue, oldValue) {
      if (!newValue.url || newValue.url === oldValue.url) {
        return;
      }
      console.log(`Settings Updating from ${oldValue.url} to ${newValue.url}`);

      this.clear();
      this.fetchFeed();
    }
  },
  destroyed() {
    this.clear();
  },
  components: {
    FeedItem
  }
};
</script>
