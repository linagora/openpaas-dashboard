<template>
  <v-avatar :size="size" color="primary">
    <img v-if="url" :src="url"/>
    <span v-else class="white--text headline">{{email[0].toUpperCase()}}</span>
  </v-avatar>
</template>

<script>
export default {
  name: "PeopleAvatar",
  props: {
    email: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 40
    },
    types: {
      type: Array,
      default() {
        return ["user", "contact", "group"];
      }
    }
  },
  data: () => ({
    url: undefined
  }),
  mounted() {
    this.$http
      .searchPeople({ q: this.email, objectTypes: this.types, limit: 1 })
      .then(({ data }) => {
        if (data && data.length) {
          this.url = `${data[0].photos[0].url}&size=45`;
        }
      })
      .catch(err => {
        console.log("Can not load avatar from people API", err);
      });
  }
};
</script>
