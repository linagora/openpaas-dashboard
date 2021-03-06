<template>
  <v-card data-test="widget-card" min-height="110" flat id="card" :style="{  borderLeftColor: borderColor }">
    <div id="icon" v-if="card.icon">
      <v-icon>{{card.icon}}</v-icon>
    </div>
    <v-badge overlap color="blue" id="badge">
      <template v-slot:badge>
        <v-tooltip v-if="counter" bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on" >{{ counter }}</span>
          </template>
          <span>{{ $tc("count.widget.used", counter) }}</span>
        </v-tooltip>
      </template>
      <v-container id="cardcontainer" fluid grid-list-lg>
        <v-layout row>
          <div class="meta">
            <v-card-text class="text-xs-left pa-0">
              <div id="title">
                <span class="title font-weight-bold grey--text text--darken-1">{{$t(card.title)}}</span>
              </div>
              <div id="description">
                <span class="subheading grey--text">{{$t(card.description)}}</span>
              </div>
              <div id="categories">
                <v-btn
                  v-for="category in orderCategories(card.categories)"
                  :key="category"
                  @click="filterByCategory(category)"
                  :color="borderColor"
                  class="button"
                  small outline round dark depressed>{{ getCategoryName(category) }}</v-btn>
              </div>
            </v-card-text>
          </div>
          <div class="actions pr-1">
            <v-card-actions>
              <v-layout align-end justify-end>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      data-test="widget-card-add"
                      @click="add"
                      color="primary"
                      :disabled="!card.available"
                      fab dark depressed
                      id="add-card-btn"
                    >
                      <v-icon dark>add</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t("Use this widget") }}</span>
                </v-tooltip>
              </v-layout>
            </v-card-actions>
          </div>
        </v-layout>
      </v-container>
    </v-badge>
  </v-card>
</template>

<script>
import { theme } from "@/style";
import CategoryMixin from "@/mixins/category";

export default {
  name: "WidgetStoreCard",
  mixins: [CategoryMixin],
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
    },
    orderCategories(categories) {
      return (categories || []).sort((a, b) => a.localeCompare(b));
    },
    filterByCategory(category) {
      this.$emit("filter", { category });
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

#categories
  .button
    text-transform: unset
    font-weight: unset
    height: 24px

span
  >>> span#badge
    height: 25px
    width: 25px
    font-size: 18px;
    font-weight: 500;

.meta
  display: flex
  flex-grow: 1

.actions
  display: flex

</style>
