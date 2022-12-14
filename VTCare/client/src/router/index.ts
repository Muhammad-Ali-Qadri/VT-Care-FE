import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";
import RegisterView from "../components/RegisterForm.vue";
import LoginView from "../components/LogInForm.vue";
import ProviderListView from "../components/providerList.vue";
import ReviewBooking from "../components/ReviewBooking.vue";
import ProfilePageView from "../components/profilePage.vue";
import { Provider } from "@/types";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/providerlist",
    name: "providerlist",
    component: ProviderListView,
  },
  {
    path: "/reviewBooking",
    name: "reviewBooking",
    component: ReviewBooking,
  },
  {
    path: "/profile",
    name: "profilepage",
    component: ProfilePageView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
