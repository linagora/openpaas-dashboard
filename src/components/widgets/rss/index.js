import Feed from "./components/Feed.vue";
import FeedSettings from "./components/FeedSettings.vue";

const components = {
  main: { component: Feed },
  settings: { component: FeedSettings }
};

export default {
  title: "RSS",
  type: "rss",
  icon: "rss_feed",
  description: "Display news from RSS feed",
  components
};
