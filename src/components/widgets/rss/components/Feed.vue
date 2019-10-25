<template>
  <div id="feed">
    <v-layout row wrap v-if="lastItems && lastItems.length">
      <v-flex>
        <v-list three-line>
          <template v-for="(item, index) in lastItems">
            <feed-item :item="item" :key="item.id"/>
            <v-divider v-if="index + 1 < lastItems.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <v-container
      v-else-if="error"
      pt-0 align-center justify-center align-content-center d-flex :style="{flexDirection: 'column'}"
    >
      <v-flex pb-2>
        <span class="title font-weight-light red--text">{{$t(error)}}</span>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetch } from "../services/rss";
import FeedItem from "./FeedItem.vue";

export default {
  name: "Feed",
  mounted() {
    if (!this.settings.url) {
      return;
    }
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
    limit: 5,
    timeout: null,
    feed: null,
    error: null
  }),
  computed: {
    lastItems() {
      return this.feed && this.feed.items ? this.feed.items.slice(0, this.itemsSize) : null;
    },
    itemsSize() {
      return this.settings.limit || this.limit;
    },
    endpoint() {
      return this.settings.proxy ? `${this.proxyUrl}?proxy=${this.settings.url}` : this.settings.url;
    },
    ...mapGetters({ proxyUrl: "applicationConfiguration/getProxyServiceUrl" })
  },
  methods: {
    fetchFeed() {
      if (!this.settings.url) {
        console.log("Feed URL is empty");
        return;
      }

      console.log("Fetching feed", this.settings.url);
      this.$emit("loading", true);

      fetch(this.endpoint)
        .then(feed => {
          // TODO: order items by date
          // TODO: limit nb of items
          this.error && (this.error = null); // avoid tilt while loading after an error by waiting for feed items
          this.feed = feed;
          this.$emit("updateTitle", this.feed.title);
        })
        .catch(err => {
          console.log("Error while getting RSS feed", err);
          this.error = "Can not load feed";
        })
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
