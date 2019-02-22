<template>
  <v-card>
    <v-card-title>
      <v-icon large left>{{icon}}</v-icon>
      <span class="title font-weight-light ml-2">{{title}}</span>
    </v-card-title>
    <v-card-text>
      <slot name="body"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "widget",
  props: {
    title: String,
    icon: String
  }
}
</script>
