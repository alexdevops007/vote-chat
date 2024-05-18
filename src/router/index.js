import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/vote",
    name: "Vote",
    component: () => import("@/views/VotePage.vue"),
  },
  {
    path: "/cat-list",
    name: "CatList",
    component: () => import("@/views/CatListPage.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/views/FavoritesPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
