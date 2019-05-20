import Feed from "./components/Feed.vue";
import FeedSettings from "./components/FeedSettings.vue";

const components = {
  main: { component: Feed },
  settings: { component: FeedSettings }
};

const settings = {
  data: {
    limit: 5
  },
  validate(settings) {
    return settings && settings.url && settings.url.length > 0;
  }
};

export default {
  title: "RSS",
  type: "rss",
  icon: "rss_feed",
  description: "Display news from RSS feed",
  components,
  settings
};
