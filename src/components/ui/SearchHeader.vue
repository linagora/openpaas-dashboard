<template>
  <v-form @submit.prevent="search" id="form">
    <v-text-field
      v-model="query"
      flat
      solo-inverted
      hide-details
      clearable
      color="grey"
      prepend-inner-icon="search"
      ref="searchfield"
      :label="$t('Search...')"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchHeader",
  data: () => ({
    query: null
  }),
  computed: {
    ...mapGetters({
      searchUrl: "applicationConfiguration/getSearchUrl"
    })
  },
  methods: {
    search() {
      window.open(`${this.searchUrl}${this.query}`, "_blank");
      this.$nextTick(() => {
        this.query = null;
        this.$refs["searchfield"].blur();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#form
  width: 100%
  margin-right: 10px
  margin-left: 10px

@media screen and (min-width: 960px)
  #form
    width: 500px

@media screen and (min-width: 1264px)
  #form
    width: 100%
    max-width: 700px
</style>
