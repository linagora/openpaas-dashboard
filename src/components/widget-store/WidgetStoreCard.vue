<template>
  <v-card data-test="widget-card" height="110" flat hover id="card" :style="{  borderLeftColor: borderColor }">
    <div id="icon" v-if="card.icon">
      <v-icon>{{card.icon}}</v-icon>
    </div>
    <v-badge overlap color="blue" id="badge">
      <template v-slot:badge>
        <v-tooltip v-if="counter" bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on" >{{ counter }}</span>
          </template>
          <span>{{ `Used ${counter} times` }}</span>
        </v-tooltip>
      </template>
      <v-container id="cardcontainer" fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs8 md8 lg8>
            <v-card-text class="text-xs-left pa-0">
              <div id="title">
                <span class="headline font-weight-bold grey--text text--darken-1">{{$t(card.title)}}</span>
              </div>
              <div id="description">
                <span class="title grey--text">{{$t(card.description)}}</span>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs4 md4 lg4>
            <v-card-actions>
              <v-layout align-end justify-end pb-3>
                <v-btn
                  data-test="widget-card-add"
                  @click="add" color="primary" :disabled="!card.available" fab dark depressed
                >
                  <v-icon dark size="50">add</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-badge>
  </v-card>
</template>

<script>
import { theme } from "@/style";

export default {
  name: "WidgetStoreCard",
  props: {
    card: {
      type: Object
    },
    counter: {
      type: Number
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
  align-items: left
  justify-content: left

  i
    font-size: 100px
    opacity: 0.1
    margin-left: 25px

#description
  margin-top: 5px

#cardcontainer
  padding:15px

span
  >>> span#badge
    height: 25px
    width: 25px
    font-size: 18px;
    font-weight: 500;
</style>
