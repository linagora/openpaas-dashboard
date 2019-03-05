<template>
 <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm12 md6 lg6>
        <widget title="Inbox" icon="email">
          <email-list slot="body"/>
        </widget>
      </v-flex>
      <v-flex sm12 md4 lg4>
        <widget title="Calendar" icon="event">
          <calendar slot="body"/>
        </widget>
      </v-flex>
      <v-flex sm12 md2 lg2>
        <widget color="purple">
          <weather slot="body"/>
        </widget>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Widget from "@/components/Widget.vue";

export default {
  name: "home",
  components: {
    Widget
  }
};
</script>
