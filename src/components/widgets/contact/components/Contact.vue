<template>
<div id="contact">
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    item-text="displayName"
    item-value="displayName"
    label="Contacts"
    cache-items
    return-object
    clearable
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-title>
          Search for contacts
        </v-list-tile-title>
      </v-list-tile>
    </template>
    <template slot="item" slot-scope="data">
      <v-list-tile-avatar>
        <v-avatar>
          <img :src="data.item.avatarUrl"/>
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="data.item.displayName"></v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
  <v-expand-transition>
    <span v-if="model">
      <contact-display :model="model"/>
    </span>
  </v-expand-transition>
</div>
</template>

<script>
import ContactDisplay from "./ContactDisplay.vue";

export default {
  name: "Contact",
  data: () => ({
    model: null,
    isLoading: false,
    items: [],
    search: null
  }),
  watch: {
    search(val) {
      if (!val || val === null) {
        return;
      }
      this.isLoading = true;

      this.$store
        .dispatch("contact/searchContacts", val)
        .then(contacts => {
          this.items = contacts || [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  components: {
    ContactDisplay
  }
};
</script>
