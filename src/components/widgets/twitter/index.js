import Twitter from "./components/Twitter.vue";

const components = {
  main: { component: Twitter, title: "Twitter", columns: 2 }
};

const settings = {};

export default {
  title: "Twitter",
  type: "twitter",
  icon: "chat_bubble_outline",
  description: "Display your Twitter mentions and messages",
  components,
  settings
};
