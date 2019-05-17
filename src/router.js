import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import ApplicationSettings from "@/services/application-settings";
import { loadLanguage, getLocale } from "@/i18n";

Vue.use(Router);

export const routeNames = Object.freeze({
  HOME: "Home",
  LOGIN: "Login",
  DASHBOARD: "Dashboard"
});

const router = new Router({
  base: ApplicationSettings.BASE_URL, // Needed for dev/build and HTML history
  mode: "history",
  routes: [
    {
      path: "/",
      name: routeNames.HOME,
      redirect: {
        name: routeNames.DASHBOARD,
        params: { id: "default" }
      },
      meta: {
        auth: false
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
      path: "/boards/:id",
      name: routeNames.DASHBOARD,
      component: Dashboard,
      props: true,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  loadLanguage(getLocale()).then(() => next());
});

export default router;
