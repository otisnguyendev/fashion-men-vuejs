<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="3"
        v-for="(product, i) in paginatedProducts"
        :key="i"
      >
        <v-card class="mx-auto max-w-xs relative">
          <v-img
            :src="product.img"
            height="200px"
            cover
            class="transition-opacity duration-300 group hover:opacity-50"
            @click="goToDetail(product.id)"
          ></v-img>

          <v-divider></v-divider>
          <v-card-title class="text-lg">
            {{ product.name }}
          </v-card-title>
          <v-card-subtitle
            class="product-price text-xl text-red-700 font-bold-medium"
          >
            {{ formatPrice(product.money) }}
          </v-card-subtitle>
          <v-card-actions class="flex justify-between hover:text-red-500">
            <v-btn
              prepend-icon="mdi mdi-cart"
              @click="addToCart(product)"
              :class="{ 'animate-bounce': isBouncing }"
            >
              add to cart
            </v-btn>
            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-heart"
            ></v-btn>
            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      class="mt-5"
      v-model="currentPage"
      :length="totalPages"
      :items-per-page="itemsPerPage"
      @input="onPageChange"
    ></v-pagination>
  </div>
</template>

<script>
import axios from "axios";
import cartStore from "@/store/cartStore";

export default {
  data() {
    return {
      products: [],
      isBouncing: false,
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.products.slice(start, start + this.itemsPerPage);
    },
  },
  async mounted() {
    console.log("Product component mounted.");

    try {
      const response = await axios.get(
        "https://6721e2f098bbb4d93caa22ac.mockapi.io/products"
      );
      this.products = response.data;
      this.currentPage = pageNumber;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    onPageChange(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goToDetail(productId) {
      this.$router.push({ name: "ProductDetail", params: { id: productId } });
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addToCart(product) {
      const item = {
        id: product.id,
        title: product.name,
        price: product.money,
        imageSrc: product.img,
        quantity: 1,
      };
      cartStore.addItem(item);
    },
    viewCart() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped>
.v-card {
  position: relative;
}
</style>
