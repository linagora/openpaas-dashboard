<template>
  <v-snackbar v-model="show" :timeout="snackbar.timeout">
    {{ snackbar.message }}
    <v-btn dark flat @click="show = false">{{$t('Close')}}</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Snackbar",
  computed: {
    show: {
      get() {
        return this.$store.state.ui.snackbar.show;
      },
      set(value) {
        this.$store.dispatch("ui/displaySnackbar", value);
      }
    },
    snackbar: function() {
      return this.$store.state.ui.snackbar;
    }
  }
};
</script>
