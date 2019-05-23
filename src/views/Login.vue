<template>
  <v-content id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 md5 lg4>
          <v-card class="pa-3" flat>
            <v-card-text>
              <v-form data-test="login-form" @keydown.native.enter="login">
                <v-text-field
                    prepend-icon="account_circle"
                    name="login"
                    :label="$t('Identifier')"
                    type="text"
                    v-model="email"
                ></v-text-field>
                <v-text-field
                    prepend-icon="lock"
                    name="password"
                    :label="$t('Password')"
                    id="password"
                    type="password"
                    v-model="password"
                    required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                :disabled="logMeIn"
                :loading="logMeIn"
                @click="login">{{$t('Login')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { routeNames } from "@/router";

export default {
  data() {
    return {
      logMeIn: false,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      this.logMeIn = true;
      this.$auth
        .login({
          url: "api/jwt/generate",
          auth: {
            username: this.email,
            password: this.password
          },
          rememberMe: false,
          redirect: { name: routeNames.HOME }
        })
        .then(response => {
          this.$store.dispatch("session/setJWTToken", response.data);
          this.$store.dispatch("user/fetchUser");

          return response.data;
        })
        .catch(() => {
          this.$store.dispatch("ui/displaySnackbarMessage", "Login error, please retry");
        })
        .finally(() => {
          setTimeout(() => (this.logMeIn = false), 300);
        });
    }
  }
};
</script>

<style scoped>
#login {
  height: 80vh;
}
</style>
