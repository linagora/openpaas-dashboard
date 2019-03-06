<template>
  <v-card :color="color">
    <v-card-title v-if="icon || title">
      <v-icon v-if="icon" large left>{{icon}}</v-icon>
      <span v-if="title" class="title font-weight-light ml-2">{{title}}</span>
    </v-card-title>
    <v-card-text class="body" :style="{height: `${height}px`}">
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
    color: String,
    height: {
      type: Number
    }
  }
}
</script>

<style scoped>
.body {
  overflow-y: scroll;
}
</style>
