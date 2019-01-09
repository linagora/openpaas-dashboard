import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import ApplicationSettings from "@/services/application-settings";

Vue.use(Router);

// Set your routes here
export const routeNames = Object.freeze({
  HOME: "Home",
  LOGIN: "Login",
  ABOUT: "About"
});

export default new Router({
  base: ApplicationSettings.BASE_URL, // Needed for dev/build and HTML history
  mode: "history",
  routes: [
    {
      path: "/",
      name: routeNames.HOME,
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: "/login",
      name: routeNames.LOGIN,
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: "/about",
      name: routeNames.ABOUT,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
