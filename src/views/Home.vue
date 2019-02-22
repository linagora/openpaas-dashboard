<template>
  <div class="home">
    <widget>
      <email-list slot="body"/>
    </widget>
  </div>
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
