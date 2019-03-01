<template>
  <v-card :color="color">
    <v-card-title>
      <v-icon v-if="icon" large left>{{icon}}</v-icon>
      <span v-if="title" class="title font-weight-light ml-2">{{title}}</span>
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
    icon: String,
    color: String
  }
}
</script>
