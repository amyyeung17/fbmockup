import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("../components/profile/Profile.vue"),
      props: true,
    },
    {
      path: "/message/:id",
      name: "message",
      component: () => import("../components/message/Message.vue"),
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../components/other/Landing.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../components/other/Info.vue"),
    },
    {
      path: "/",
      redirect: "/welcome",
    }, 
    {
      path: "/:noPage(.*)",
      name: "notfound",
      component: () => import("../components/other/NotFound.vue"),
    }
  ],
});

export default router;
