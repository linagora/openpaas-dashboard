<template>
  <div>
    <v-card-text>
      <v-text-field :value="settings.url" @input="updateUrl" label="RSS URL e.g. https://example.com/rss"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn flat @click="updateSettings()">Set</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "FeedSettings",
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    updatedUrl: null
  }),
  methods: {
    updateUrl(url) {
      this.updatedUrl = url;
    },
    updateSettings() {
      this.$emit("updated", { url: this.updatedUrl });
    }
  }
};
</script>
