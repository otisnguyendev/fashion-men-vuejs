<template>
  <v-container class="p-8" id="app">
    <Navbar />
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="h-96">
          <v-img
            :src="product.img || '/default-image.jpg'"
            height="100%"
            class="d-flex align-center justify-center"
          >
            <template v-slot:placeholder="{ isLoading }">
              <span v-if="isLoading" class="text-[#6b7280]"
                >Đang tải ảnh...</span
              >
            </template>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="pl-8">
        <h1 class="text-2xl font-bold">
          {{ product.name }}
        </h1>
        <p class="text-[#6b7280]">
          Mã sản phẩm: {{ product.id }} | Tình trạng: Còn hàng | Thương hiệu:
          TORANO
        </p>
        <div class="mt-4">
          <span class="text-red-500 text-2xl font-bold">
            {{ formatPrice(product.money) }}
          </span>
          <span class="line-through text-[#6b7280] ml-2">500,000₫</span>
          <span class="bg-[#ef4444] text-white text-sm ml-2 px-2 py-1 rounded"
            >-50%</span
          >
        </div>
        <div class="mt-4">
          <p class="font-bold">Màu sắc:</p>
          <div class="flex space-x-2 mt-2">
            <v-btn
              v-for="color in colors"
              :key="color"
              :class="[
                'border',
                color === selectedColor
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent',
              ]"
              @click="selectColor(color)"
            >
              {{ color }}
            </v-btn>
          </div>
        </div>
        <div class="mt-4">
          <p class="font-bold">Kích thước:</p>
          <div class="flex space-x-2 mt-2">
            <v-btn
              v-for="size in sizes"
              :key="size"
              :class="[
                'border',
                size === selectedSize
                  ? 'bg-blue-500 text-white'
                  : 'bg-transparent',
              ]"
              @click="selectSize(size)"
            >
              {{ size }}
            </v-btn>
          </div>
          <a class="text-[#3b82f6] mt-2 block" href="#">Hướng dẫn chọn size</a>
        </div>
        <div class="mt-4">
          <p class="font-bold">Số lượng:</p>
          <div class="flex items-center mt-2">
            <v-btn class="border" @click="decrement">-</v-btn>
            <input
              class="border text-center w-12"
              type="text"
              v-model="quantity"
              readonly
            />
            <v-btn class="border" @click="increment">+</v-btn>
          </div>
        </div>
        <div class="mt-4 flex space-x-4">
          <v-btn
            class="bg-[#ef4444] text-white"
            @click="addToCart(product)"
            :class="{ 'animate-bounce': isBouncing }"
          >
            THÊM VÀO GIỎ HÀNG
          </v-btn>
          <v-btn class="bg-red-900 text-white">MUA NGAY</v-btn>
        </div>
        <v-btn class="bg-gray-800 text-white mt-4"
          >CLICK VÀO ĐÂY ĐỂ NHẬN ƯU ĐÃI</v-btn
        >
        <div class="mt-4 flex space-x-4 text-3xl">
          <a class="text-[#3b82f6]" href="#">
            <i class="mdi mdi-facebook"></i>
          </a>
          <a class="text-blue-400" href="#">
            <i class="mdi mdi-facebook-messenger"></i>
          </a>
          <a class="text-blue-300" href="#">
            <i class="mdi mdi-twitter"></i>
          </a>
          <a class="text-[#ef4444]" href="#">
            <i class="mdi mdi-pinterest"></i>
          </a>
          <a class="text-blue-500" href="#">
            <i class="mdi mdi-link"></i>
          </a>
        </div>

        <div class="mt-4">
          <p class="text-[#6b7280]">Miễn phí giao hàng cho đơn hàng từ 500K</p>
          <p class="text-[#6b7280]">Hàng phân phối chính hãng 100%</p>
          <p class="text-[#6b7280]">TỔNG ĐÀI 24/7: NGUYỄN QUỐC BẢO</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cartStore from "@/store/cartStore";

export default {
  data() {
    return {
      quantity: 1,
      product: [],
      isBouncing: false,
      colors: ["Xám nhạt", "Xanh đá đậm", "Xanh navy", "Dark Navy", "Đen"],
      sizes: ["S", "M", "L", "XL"],
      selectedColor: null,
      selectedSize: null,
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.fetchProductDetails(productId);
  },
  methods: {
    async fetchProductDetails(id) {
      try {
        const response = await fetch(
          `https://6721e2f098bbb4d93caa22ac.mockapi.io/products/${id}`
        );
        if (!response.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");

        this.product = await response.json();
        console.log("Dữ liệu sản phẩm:", this.product);
      } catch (error) {
        console.error(error);
      }
    },
    formatPrice(price) {
      if (typeof price === "number") {
        return price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
      return "0₫";
    },
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart(product) {
      const item = {
        id: product.id,
        title: product.name,
        price: product.money,
        imageSrc: product.img,
        quantity: this.quantity,
        color: this.selectedColor,
        size: this.selectedSize,
      };

      cartStore.addItem(item);

      this.isBouncing = true;
      setTimeout(() => {
        this.isBouncing = false;
      }, 1000);
    },
    viewCart() {
      this.$router.push("/cart");
    },
    selectColor(color) {
      this.selectedColor = color;
    },
    selectSize(size) {
      this.selectedSize = size;
    },
  },
};
</script>

<style scoped>
.v-btn.bg-blue-500 {
  border: 2px solid #3b82f6;
}

.v-btn.bg-blue-500:hover {
  background-color: #2563eb;
}
</style>
