<template>
  <v-img :src="imageUrl" :height="height" @error="onError"></v-img>
</template>

<script>
export default {
  name: "DashboardAppsGridIcon",
  data: () => ({
    error: false
  }),
  props: {
    url: String,
    defaultUrl: String,
    height: String
  },
  methods: {
    onError() {
      this.error = true;
    }
  },
  computed: {
    imageUrl() {
      return this.error ? this.defaultUrl : this.url;
    }
  }
};
</script>
