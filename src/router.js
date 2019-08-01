import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import DashboardSidebar from "@/views/dashboard/DashboardSidebar.vue";
import NotFound from "@/views/NotFound.vue";
import ApplicationSettings from "@/services/application-settings";
import { loadLanguage, getLocale } from "@/i18n";
import store from "@/store";

const LoginView = (auth = "basic") => import(`@/views/login/${auth}/Login.vue`);

Vue.use(Router);

export const routeNames = Object.freeze({
  HOME: "Home",
  LOGIN: "Login",
  DASHBOARD: "Dashboard",
  STORE: "Store",
  NOTFOUND: "NotFound"
});

const router = new Router({
  base: ApplicationSettings.BASE_URL, // Needed for dev/build and HTML history
  mode: "history",
  routes: [
    {
      path: "/",
      name: routeNames.HOME,
      redirect: { name: routeNames.DASHBOARD },
      meta: {
        // FIXME
        auth: false,
        isPublic: true
      }
    },
    {
      path: "/login",
      name: routeNames.LOGIN,
      component: () => LoginView(ApplicationSettings.VUE_APP_AUTH),
      meta: {
        // FIXME
        auth: false,
        isPublic: true
      },
      beforeEnter(to, from, next) {
        Vue.auth.check && Vue.auth.check() ? next("/") : next();
      }
    },
    {
      path: "/store/:category?",
      name: routeNames.STORE,
      components: {
        default: () => import(/* webpackChunkName: "widget-store" */ "@/views/widget-store/WidgetStore.vue"),
        sidebar: () => import(/* webpackChunkName: "widget-store" */ "@/views/widget-store/WidgetStoreSidebar.vue")
      },
      props: {
        default: true,
        sidebar: true
      },
      meta: {
        // TODO
        auth: true,
        isPublic: false,
        showToolbarExtension: true
      },
      beforeEnter: async (to, from, next) => {
        await store.getters["session/ready"];

        if (!store.state.dashboard.dashboards || store.state.dashboard.dashboards.length === 0) {
          return next({ name: routeNames.DASHBOARD });
        }

        next();
      }
    },
    {
      path: "/boards/:id?",
      name: routeNames.DASHBOARD,
      components: {
        default: Dashboard,
        sidebar: DashboardSidebar
      },
      props: true,
      meta: {
        // TODO
        auth: true,
        isPublic: false
      },
      beforeEnter: async (to, from, next) => {
        await store.getters["session/ready"];
        await store.dispatch("widgets/getSettings");

        if (!store.state.dashboard.dashboards || store.state.dashboard.dashboards.length === 0) {
          try {
            await store.dispatch("dashboard/loadDashboards");
          } catch (err) {
            // Do not break the flow, let next to be called correctly
            console.log("Error while loading dashboards", err);
          }
        }

        if (!to.params.id) {
          const currentUser = store.getters["user/getCurrentUser"];

          return next({ name: routeNames.DASHBOARD, params: { id: currentUser._id } });
        }

        next();
      }
    },
    {
      path: "*",
      name: routeNames.NOTFOUND,
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  loadLanguage(getLocale()).then(() => next());
});

export default router;
