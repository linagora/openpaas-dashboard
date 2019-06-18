<template>
  <div id="github">
    <v-layout row wrap v-if="lastItems && lastItems.length">
      <v-flex>
        <v-list>
          <template v-for="(item, index) in lastItems">
            <tweet :item="item" :key="item.id"/>
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
    <v-container
      v-if="!configuration"
      pt-0 align-center justify-center align-content-center d-flex :style="{flexDirection: 'column'}"
    >
      <v-flex pb-2>
        <span class="title font-weight-light">{{$t("Your Twitter account is not configured")}}</span>
      </v-flex>
      <v-flex pb-2>
        <a class="title font-weight-light" :href="configurationLink" target="_blank">{{$t("Configure")}}</a>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tweet from "./Tweet.vue";

export default {
  name: "Twitter",
  mounted() {
    this.fetch();
  },
  data: () => ({
    delay: 60 * 1000,
    limit: 10,
    timeout: null,
    items: null,
    error: null
  }),
  computed: {
    lastItems() {
      return (this.items || []).slice(0, this.limit);
    },
    configuration() {
      const twitterAccount = this.currentUser.accounts.find(
        account => account.type === "oauth" && account.data && account.data && account.data.provider === "twitter"
      );

      return twitterAccount && twitterAccount.data;
    },
    configurationLink() {
      return this.getServiceUrl("#/controlcenter/accounts");
    },
    ...mapGetters({
      currentUser: "user/getCurrentUser",
      getServiceUrl: "applicationConfiguration/getServiceUrl"
    })
  },
  methods: {
    fetch() {
      if (!this.configuration) {
        return;
      }

      this.$emit("loading", true);

      this.$openpaas.api.twitter
        .getMentions({ account_id: this.configuration.id })
        .then(items => {
          this.error && (this.error = null); // avoid tilt while loading after an error by waiting for feed items
          this.items = (items && items.messages) || [];
        })
        .catch(err => {
          console.log("Error while getting tweets", err);
          this.error = "Can not load tweets";
        })
        .finally(() => this.$emit("loading", false));

      this.timeout = setTimeout(this.fetch, this.delay);
    },
    clear() {
      this.timeout && clearTimeout(this.timeout);
      this.items = null;
    }
  },
  destroyed() {
    this.clear();
  },
  components: {
    Tweet
  }
};
</script>
