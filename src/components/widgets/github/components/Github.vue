<template>
  <div id="github">
    <v-layout row wrap v-if="lastItems && lastItems.length">
      <v-flex>
        <v-list>
          <template v-for="(item, index) in lastItems">
            <github-item :item="item" :key="item.id"/>
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
import { fetchReceivedEvents } from "../services/client";
import GithubItem from "./GithubItem.vue";

export default {
  name: "Github",
  mounted() {
    this.fetch();
  },
  data: () => ({
    delay: 60 * 1000,
    limit: 10,
    timeout: null,
    items: null,
    error: null,
    supportedTypes: ["ForkEvent", "PushEvent", "WatchEvent"]
  }),
  computed: {
    lastItems() {
      return (this.items || []).filter(item => this.supportedTypes.indexOf(item.type) !== -1).slice(0, this.limit);
    },
    configuration() {
      const githubAccount = this.currentUser.accounts.find(
        account => account.type === "oauth" && account.data && account.data && account.data.provider === "github"
      );

      return githubAccount && githubAccount.data;
    },
    ...mapGetters({
      currentUser: "user/getCurrentUser"
    })
  },
  methods: {
    fetch() {
      if (!this.configuration) {
        this.error = "Github account is not configured";

        return;
      }

      this.$emit("loading", true);

      fetchReceivedEvents(this.configuration)
        .then(items => {
          this.error && (this.error = null); // avoid tilt while loading after an error by waiting for feed items
          this.items = items;
        })
        .catch(err => {
          console.log("Error while getting Github timeline", err);
          this.error = "Can not load Github timeline";
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
    GithubItem
  }
};
</script>
