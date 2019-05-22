<template>
  <dashboard-rest-widget
    @response="onResponse"
    @error="onError"
    @loading="onLoading"
    :url="settings.url"
    :items="items"
  >
    <template slot-scope="{ item }">
      <v-list-tile :href="`https://www.coinlore.com/coin/${item.nameid}`" target="_blank">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="font-weight-medium">{{ item.name }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <span>${{ item.price_usd }}</span>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </dashboard-rest-widget>
</template>

<script>
export default {
  name: "Cryptocurrency",
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    items: []
  }),
  methods: {
    onResponse(response) {
      this.items = response.data.data;
    },
    onError(error) {
      this.$emit("error", error);
    },
    onLoading(status) {
      this.$emit("loading", status);
    }
  }
};
</script>
