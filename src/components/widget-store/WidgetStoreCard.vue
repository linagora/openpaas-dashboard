<template>
  <v-card height="220" flat hover id="card" :style="{  borderLeftColor: borderColor }">
    <div id="icon" v-if="card.icon">
      <v-icon>{{card.icon}}</v-icon>
    </div>
    <v-card-text class="text-xs-center">
      <div id="title">
        <span class="headline font-weight-bold grey--text text--darken-1">{{$t(card.title)}}</span>
      </div>
      <div id="description">
        <span class="title grey--text">{{$t(card.description)}}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-layout align-end justify-center fill-height pb-3>
        <v-btn @click="add" color="primary" :disabled="!card.available" fab dark depressed>
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { theme } from "@/style";

export default {
  name: "WidgetStoreCard",
  props: {
    card: {
      type: Object
    }
  },
  data: () => ({
    // TODO: Get the right color from card once available
    borderColor: theme.colors.blue.base
  }),
  methods: {
    add() {
      this.$emit("add");
    }
  }
};
</script>

<style lang="stylus" scoped>
#card
  display: flex
  flex-direction: column
  justify-content: space-between
  border-left-width: 5px
  border-left-style: solid

#icon
  position: absolute
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center

  i
    font-size: 180px
    opacity: 0.1
</style>
