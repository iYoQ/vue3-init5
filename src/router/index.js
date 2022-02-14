import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import NotFound from "@/views/NotFound.vue";
import Home from "../views/Home.vue";
import ArticleSingle from "@/views/ArticleSingle.vue";
import NewsList from "@/views/NewsList.vue";
import NewsSingle from "@/views/NewsSingle.vue";
import AppLogin from "@/components/AppLogin.vue";
import CreateArticle from "@/views/CreateArticle.vue";
import CreateNews from "@/views/CreateNews.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/article/:articleId(\\d+)",
    name: "article",
    component: ArticleSingle,
    props: true,
  },
  {
    path: "/create_article",
    name: "create-article",
    component: CreateArticle,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/news",
    name: "news-list",
    component: NewsList,
    props: true,
  },
  {
    path: "/news/:newsId(\\d+)",
    name: "news-single",
    component: NewsSingle,
    props: true,
  },
  {
    path: "/create_news",
    name: "create-news",
    component: CreateNews,
    props: true,
    meta: { requiresNewsmaker: true },
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin,
    props: true,
    meta: { notRequiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:pathMath(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched[0]) {
    router.push({ name: "home" });
  } else if (to.meta.notRequiresAuth) {
    store.state.access ? router.push({ name: "home" }) : next();
  } else if (to.meta.requiresAuth) {
    store.state.access ? next() : router.push({ name: "home" });
  } else if (to.meta.requiresNewsmaker) {
    store.state.isNewsmaker ? next() : router.push({ name: "home" });
  } else {
    next();
  }
});

export default router;
