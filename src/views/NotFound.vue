<template>
  <span class="not-found display-1 font-weight-thin">
    {{$t("We couldn't find this page")}}
    <router-link to="/">{{$t("Go to home page")}}</router-link>
  </span>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="stylus" scoped>
.not-found
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  justify-content: center;
</style>
