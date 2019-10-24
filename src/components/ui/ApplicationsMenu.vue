<template>
  <v-menu bottom left offset-y min-width="350px" max-width="400px">
    <v-btn icon slot="activator">
      <v-icon>apps</v-icon>
    </v-btn>
    <v-layout>
    <v-flex xs12>
      <v-card>
        <v-container v-bind="{ [`grid-list-sm`]: true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(app, index) in applications"
              :key="index"
              xs4
            >
              <div id="app-icon" @click="open(app)">
                <v-icon large :color="app.color || 'primary'">{{ app.icon }}</v-icon>
                <span class="subheading font-weight-medium">{{ $t(app.name) }}</span>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  </v-menu>
</template>

<script>
export default {
  name: "applications-menu",
  props: {
    applications: {
      type: Array
    }
  },
  methods: {
    open(application) {
      window.open(application.url, "_blank");
    }
  }
};
</script>

<style lang="stylus" scoped>
#app-icon
  display: flex
  flex-direction: column
  align-items: center
  cursor: pointer
</style>
