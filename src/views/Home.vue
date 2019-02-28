<template>
 <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm6 md6 lg4>
        <widget title="Todo" icon="list">
        </widget>
      </v-flex>
      <v-flex sm6 md6 lg4>
        <widget title="My Files" icon="folder">
        </widget>
      </v-flex>
      <v-flex sm6 md6 lg4>
        <widget title="My contacts" icon="contacts">
        </widget>
      </v-flex>
      <v-flex sm12 md8 lg8>
        <widget title="Last Emails" icon="email">
          <email-list slot="body"/>
        </widget>
      </v-flex>
      <v-flex sm6 md4 lg4>
        <widget title="Calendar" icon="event">
          <calendar slot="body"/>
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
