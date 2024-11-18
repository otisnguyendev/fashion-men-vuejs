<template>
  <v-row class="navbar-image" :style="{ paddingTop: '64px' }" v-if="isHomePage">
    <v-col cols="12">
      <v-carousel
        v-model="currentSlide"
        :show-arrows="false"
        hide-delimiters
        width="100%"
      >
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i"
          :src="item.src"
          cover
        ></v-carousel-item>
        <div
          class="carousel-controls absolute inset-0 flex justify-between items-center px-4"
        >
          <v-icon
            @click="prevSlide"
            class="text-white bg-gray-400 bg-opacity-50 rounded-full p-5 cursor-pointer"
          >
            mdi-chevron-left
          </v-icon>
          <v-icon
            @click="nextSlide"
            class="text-white bg-gray-400 bg-opacity-50 rounded-full p-5 cursor-pointer"
          >
            mdi-chevron-right
          </v-icon>
        </div>
      </v-carousel>
    </v-col>
  </v-row>

  <div :class="navbarClass" class="z-10 fixed top-0 w-full">
    <v-app-bar :class="textColorClass">
      <v-app-bar-title class="cursor-pointer">
        <router-link to="/">TORANO</router-link>
      </v-app-bar-title>

      <v-btn class="hover:text-red-500">
        <router-link to="/new-product">Sản phẩm mới</router-link>
      </v-btn>

      <v-btn class="hover:text-red-500">
        <router-link to="/sale-product">Sale</router-link>
      </v-btn>

      <v-menu v-model="menuShirt" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @mouseenter="menuShirt = true"
            append-icon="mdi mdi-chevron-down"
            class="hover:text-red-500"
          >
            Áo nam
          </v-btn>
        </template>
        <v-list
          @mouseenter="menuShirt = true"
          @mouseleave="menuShirt = false"
          class="hover:bg-gray-200"
        >
          <v-list-item
            v-for="(category, index) in shirtMen"
            :key="index"
            @click="handleCategoryClick(category)"
          >
            <v-list-item-title>{{ category.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu v-model="menuPant" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            @mouseenter="menuPant = true"
            append-icon="mdi mdi-chevron-down"
            class="hover:text-red-500"
          >
            Quần nam
          </v-btn>
        </template>
        <v-list
          @mouseenter="menuPant = true"
          @mouseleave="menuPant = false"
          class="hover:bg-gray-200"
        >
          <v-list-item
            v-for="(category, index) in pantMen"
            :key="index"
            @click="handleCategoryClick(category)"
          >
            <v-list-item-title>{{ category.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-text-field
        density="compact"
        label="Tìm kiếm sản phẩm"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        flat
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn v-if="!isLoggedIn" class="hover:text-red-500">
        <v-icon size="24" prepend-icon class="mr-2">mdi-account</v-icon>
        <router-link to="/login">Login</router-link>
      </v-btn>

      <v-menu v-if="isLoggedIn" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="hover:text-red-500">
            <v-icon size="24" prepend-icon class="mr-2">mdi-account</v-icon>
            {{ username }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="viewProfile">
            <v-list-item-title>Thông tin cá nhân</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <router-link to="/cart">
        <div class="relative">
          <v-btn
            prepend-icon="mdi mdi-cart"
            class="hover:text-red-500 text-lg"
          ></v-btn>
          <span
            v-if="cartCount > 0"
            class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </div>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import cartStore from "@/store/cartStore";
export default {
  data() {
    return {
      menu: false,
      menuShirt: false,
      menuPant: false,
      shirtMen: [{ title: "Áo kaki" }, { title: "Áo thun" }],
      pantMen: [{ title: "Quần jean" }, { title: "Quần short" }],
      images: [
        { src: "/slide-show/slide_1.webp" },
        { src: "/slide-show/slide_2.webp" },
        { src: "/slide-show/slide_3.webp" },
      ],
      currentSlide: 0,
      isDarkNavbar: true,
    };
  },
  computed: {
    navbarClass() {
      return this.isDarkNavbar ? "navbar-dark" : "navbar-light";
    },
    textColorClass() {
      return this.isDarkNavbar ? "text-light" : "text-dark";
    },
    cartCount() {
      return cartStore.cartCount;
    },
    isHomePage() {
      return this.$route.path === "/";
    },
    isLoggedIn() {
      return localStorage.getItem("isLoggedIn") === "true";
    },
    username() {
      return localStorage.getItem("username");
    },
  },
  methods: {
    handleScroll() {
      const navbarImage = document.querySelector(".navbar-image");
      const totalHeight = Array.from(
        navbarImage?.querySelectorAll("img") || []
      ).reduce((total, img) => total + img.clientHeight, 0);
      this.isDarkNavbar = window.scrollY <= totalHeight;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.images.length) % this.images.length;
    },
    handleCategoryClick(category: { title: string }) {
      console.log("Đã chọn:", category.title);
      this.menu = false;
    },
    viewProfile() {
      this.$router.push("/profile");
    },
    logout() {
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
.navbar-dark {
  background-color: black;
  color: white;
}
.navbar-light {
  background-color: white;
  color: black;
}
</style>
