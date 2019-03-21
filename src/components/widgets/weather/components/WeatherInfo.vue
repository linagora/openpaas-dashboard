<template>
  <section>
    <div class="location">{{ location }}</div>
    <div class="description">{{ description }}</div>
  </section>
</template>

<script>
export default {
  name: "WeatherInfo",
  props: {
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="stylus">
$font-color = white;

section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location {
  text-transform: capitalize;
  font-weight: bold;
  color: $font-color;
  font-size: 1.5em;
}

.description {
  text-transform: lowercase;
  text-align: center;
  color: $font-color;
  font-size: 1.3em;
}

.description:first-letter {
  text-transform: uppercase;
}
</style>
