<template>
  <v-menu
    v-model="menu"
    open-on-hover
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    bottom>
    <template v-slot:activator="{ on }">
      <v-icon v-on="on" small color="grey lighten-1">info</v-icon>
    </template>
    <v-card>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("Current price") }}: ${{ currency.price_usd }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-chip v-on="on"
                    :color="Number(currency.percent_change_1h) > 0 ? 'green' : 'red'"
                    outline small label>{{ currency.percent_change_1h }}%
                  </v-chip>
                </template>
                <span>{{ $t("Change since one hour") }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-chip v-on="on"
                    :color="Number(currency.percent_change_24h) > 0 ? 'green' : 'red'"
                    outline small label>{{ currency.percent_change_24h }}%
                  </v-chip>
                </template>
                <span>{{ $t("Change since one day") }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-chip v-on="on"
                    :color="Number(currency.percent_change_7d) > 0 ? 'green' : 'red'"
                    outline small label>{{ currency.percent_change_7d }}%
                  </v-chip>
                </template>
                <span>{{ $t("Change since one week") }}</span>
              </v-tooltip>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "PricePopover",
  props: {
    currency: Object,
    size: {
      type: Number,
      default: 48
    }
  },
  data: () => ({
    menu: false
  })
};
</script>
