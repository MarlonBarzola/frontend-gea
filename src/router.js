import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/libraries",
    name: "libraries",
    component: () => import("./views/LibrariesList")
  },
  {
    path: "/rent",
    name: "rent",
    component: () => import("./views/RentLibrary")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddLibrary")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
