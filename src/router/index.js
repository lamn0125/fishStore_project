import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/Products.vue"),
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import("../views/Faq.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/product/:productId",
    component: () => import("../views/ProductInfo.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/Order.vue"),
  },
  {
    path: "/checkout/:orderId",
    component: () => import("../views/Checkout.vue"),
  },
  {
    path: "/checkout/success/:orderId",
    component: () => import("../views/PaySuccess.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard/products",
    component: () => import("../views/DashboardProduct.vue"),
  },
  {
    path: "/dashboard/coupons",
    component: () => import("../views/Coupons.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
