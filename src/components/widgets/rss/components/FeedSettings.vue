<template>
  <v-form ref="form" v-model="valid">
    <v-card-text>
      <v-text-field
        :value="settings.url"
        @input="updateUrl"
        :rules="urlRules"
        label="RSS URL e.g. https://example.com/rss"
        required
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn flat @click="updateSettings()" :disabled="!valid">Set</v-btn>
    </v-card-actions>
  </v-form>
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
    valid: true,
    updatedUrl: null,
    urlRules: [
      v => !!v || "URL is required",
      v => {
        try {
          const url = new URL(v);

          return ["http:", "https:"].includes(url.protocol) ? true : "URL must start with http/https";
        } catch (err) {
          return "URL is invalid";
        }
      }
    ]
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
