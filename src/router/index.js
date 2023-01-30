import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("../components/profile/ProfilePage.vue"),
      props: true,
    },
    {
      path: "/message/:id",
      name: "message",
      component: () => import("../components/message/MessagePage.vue"),
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../components/other/LandingPage.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../components/other/InfoPage.vue"),
    },
    {
      path: "/",
      redirect: "/welcome",
    },
    {
      path: "/:noPage(.*)",
      name: "notfound",
      component: () => import("../components/other/NotFound.vue"),
    },
  ],
});

export default router;
