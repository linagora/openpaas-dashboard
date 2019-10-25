import Crypto from "./components/Crypto.vue";

const components = {
  main: { component: Crypto, title: "Top Cryptocurrency List" }
};

const settings = {
  data: {
    url: "https://api.coinlore.com/api/tickers/?limit=5",
    proxy: true
  }
};

export default {
  title: "Top Cryptocurrency List",
  type: "crypto",
  icon: "attach_money",
  description: "Live Cryptocurrency Prices",
  categories: ["cryptocurrency"],
  components,
  settings
};
