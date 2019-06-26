<template>
  <dashboard-rest-widget
    @response="onResponse"
    @error="onError"
    @loading="onLoading"
    :url="settings.url"
    :items="items"
  >
    <template slot-scope="{ item }">
      <v-list-tile avatar :href="`https://www.coinlore.com/coin/${item.nameid}`" target="_blank">
        <v-list-tile-avatar>
          <v-avatar size="25">
            <img :src="`https://www.coinlore.com/img/25x25/${item.nameid}.png`"/>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="font-weight-medium">{{ item.name }}</span>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <span class="grey--text text--darken-1">{{ item.symbol }}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <div id="price">
            <span>${{ item.price_usd }}</span>
            <price-popover :currency="item"/>
          </div>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </dashboard-rest-widget>
</template>

<script>
import PricePopover from "./PricePopover.vue";

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
  },
  components: {
    PricePopover
  }
};
</script>

<style lang="stylus" scoped>
#price
  display: flex
  span
    margin-right: 5px
</style>
