<template>
  <dashboard-rest-widget
    @response="onResponse"
    @error="onError"
    @loading="onLoading"
    :url="projectsAPI"
    :items="items"
  >
    <template slot-scope="{ item }">
      <v-list-tile :href="getProjectUrl(item)" target="_blank">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="font-weight-medium">{{ item.label }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </dashboard-rest-widget>
</template>

<script>
export default {
  name: "Tuleap",
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    items: [],
    limit: 10
  }),
  computed: {
    projectsAPI() {
      return new URL(`/api/projects?limit=${this.limit}`, this.settings.url).toString();
    }
  },
  methods: {
    onResponse(response) {
      this.items = response.data;
    },
    onError(error) {
      this.$emit("error", error);
    },
    onLoading(status) {
      this.$emit("loading", status);
    },
    getProjectUrl(project) {
      return new URL(project.uri, this.settings.url).toString();
    }
  }
};
</script>
