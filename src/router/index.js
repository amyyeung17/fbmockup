import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  base: '/project3',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/welcome",
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile/:id",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      props: true,
    },
    {
      path: "/message/:id",
      name: "message",
      component: () => import("../views/MessageView.vue"),
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../views/LandingView.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/InfoView.vue"),
    },
  ],
});

export default router;
