import Cart from "@/components/Cart.vue";
import Product from "@/components/Product.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import NewProduct from "@/pages/NewProduct.vue";
import ProductDetail from "@/pages/ProductDetail.vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

const newRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new-product",
    name: "NewProduct",
    component: NewProduct,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/product-detail/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...newRoutes],
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
