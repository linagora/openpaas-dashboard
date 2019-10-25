import Feed from "../rss/components/Feed.vue";

const components = {
  main: { component: Feed }
};

const settings = {
  data: {
    url: "https://news.google.com/rss?hl=en",
    limit: 8,
    proxy: true
  }
};

export default {
  title: "Google News",
  type: "googlenews",
  icon: "public",
  description: "Display latest news from Google",
  categories: ["news", "google"],
  components,
  settings
};
