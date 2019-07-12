<template>
  <div id="sidebar-content" data-test="sidebar">
    <v-form @submit.prevent="redirectSearch" class="mb-2">
      <v-text-field
        v-model="search"
        flat
        hide-details
        clearable
        @click:clear="onClearClicked"
        prepend-inner-icon="search"
        :label="$t('Search widget')"
      ></v-text-field>
    </v-form>
    <v-list class="mt-1">
      <v-list-tile color="blue" class="tile-title" :style="{ borderLeftColor: borderColor }">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="tile-title-text" :style="{ color: titleColor }">{{$t("Categories")}}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        :class="!category ? 'grey lighten-5 active' : ''"
        to="/store/"
        active-class="all-categories"
      >
        <v-list-tile-content>
          <v-list-tile-title class="selected">{{$t("All")}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="category in categories"
        :key="category"
        @click="searchCategory(category)"
        active-class="grey lighten-5 active"
        data-test="sidebar-dashboard-item"
      >
        <v-list-tile-content>
          <v-list-tile-title class="selected with-badge">
            <span>{{ getCategoryName(category) }}</span>
            <v-spacer/>
            <v-chip
              v-if="getCategorySize(category)"
              :color="badgeColor"
              small text-color="white"
            >{{ getCategorySize(category) }}</v-chip>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { theme } from "@/style";
import CategoryMixin from "@/mixins/category";
import { routeNames } from "@/router";

export default {
  name: "WidgetStoreSidebar",
  mixins: [CategoryMixin],
  data: () => ({
    borderColor: theme.colors.blue.base,
    titleColor: theme.colors.blue.base,
    badgeColor: theme.colors.blue.base,
    search: ""
  }),
  props: {
    category: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      categories: "widgets/getCategories",
      getCategorySize: "widgets/getCategorySize"
    })
  },
  methods: {
    redirectSearch() {
      this.$router.push({ name: routeNames.STORE, query: { search: this.search } });
    },
    onClearClicked() {
      this.$router.push({ name: routeNames.STORE, params: { category: this.category } });
    },
    searchCategory(category) {
      this.search = "";
      this.$router.push({ name: routeNames.STORE, params: { category: category } });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (!to.query.search) {
      this.search = "";
    }
    next();
  }
};
</script>

<style lang="stylus" scoped>
  $color = var(--v-blue-base)

  span.tile-title-text
    color: $color
    text-transform: uppercase
    font-weight: 500

  .tile-title
    color: $color
    border-left-width: 5px
    border-left-style: solid

  .active
    .selected
      color: $color

  .with-badge
    display: flex

    .v-chip
      margin-top: 0
      margin-bottom: 0
</style>
