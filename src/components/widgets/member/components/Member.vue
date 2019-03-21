<template>
<div id="contact">
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    item-text="displayName"
    item-value="displayName"
    label="Members"
    cache-items
    return-object
    clearable
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-title>
          Search for members
        </v-list-tile-title>
      </v-list-tile>
    </template>
    <template slot="item" slot-scope="data">
      <v-list-tile-avatar>
        <people-avatar :email="data.item.preferredEmail" :size="40" :types="types"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="data.item.displayName"></v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
  <v-expand-transition>
    <span v-if="model">
      <member-display :model="model"/>
    </span>
  </v-expand-transition>
</div>
</template>

<script>
import PeopleAvatar from "@/components/PeopleAvatar.vue";
import MemberDisplay from "./MemberDisplay.vue";

export default {
  name: "Contact",
  data: () => ({
    model: null,
    isLoading: false,
    items: [],
    search: null,
    types: ["user"]
  }),
  watch: {
    search(val) {
      if (!val || val === null) {
        return;
      }
      this.isLoading = true;

      this.$store.dispatch("searchMembers", val).then(members => {
        this.items = members || [];
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  components: {
    MemberDisplay,
    PeopleAvatar
  }
};
</script>
