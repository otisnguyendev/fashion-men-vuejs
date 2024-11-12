<template>
  <section class="h-full bg-gradient-to-r from-purple-600 to-blue-500 py-10">
    <v-container>
      <Navbar />
      <v-row class="justify-center my-4">
        <v-col md="8">
          <v-card class="mb-4">
            <v-card-title>
              <h5 class="mb-0">Giỏ hàng</h5>
            </v-card-title>
            <v-card-text>
              <div
                v-for="(item, index) in cartItems"
                :key="index"
                class="flex flex-col md:flex-row mb-6"
              >
                <v-img
                  :src="item.imageSrc"
                  class="w-full md:w-1/5 mb-4 md:mb-0"
                  cover
                ></v-img>

                <div class="flex-1 md:px-6">
                  <p class="font-semibold text-lg">{{ item.title }}</p>

                  <p class="mt-2"><strong>Màu sắc:</strong> {{ item.color }}</p>
                  <p class="mt-2">
                    <strong>Kích thước:</strong> {{ item.size }}
                  </p>

                  <v-select
                    v-model="item.shippingMethod"
                    :items="['Giao hàng nhanh', 'Giao hàng tiết kiệm']"
                    label="Chọn phương thức giao hàng"
                    class="mt-2"
                  ></v-select>

                  <div class="flex space-x-4 mt-2">
                    <v-btn
                      icon
                      color="primary"
                      class="btn-sm"
                      @click="removeItem(index)"
                    >
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="error"
                      class="btn-sm"
                      @click="moveToWishlist(index)"
                    >
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </div>
                </div>

                <div class="w-full md:w-1/4 flex flex-col items-center">
                  <div class="flex items-center mb-2">
                    <v-btn
                      icon
                      color="primary"
                      @click="decreaseQuantity(index)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-text-field
                      v-model="item.quantity"
                      type="number"
                      min="0"
                      class="mx-2 w-16 text-center"
                      dense
                    ></v-text-field>
                    <v-btn
                      icon
                      color="primary"
                      @click="increaseQuantity(index)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <p class="font-semibold">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="mb-4">
            <v-card-text>
              <div class="flex space-x-4">
                <v-img
                  v-for="icon in paymentIcons"
                  :key="icon.alt"
                  :src="icon.src"
                  width="45px"
                ></v-img>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col md="4">
          <div class="bg-white shadow-lg rounded-lg mb-4 p-4">
            <h5 class="text-xl font-semibold mb-4">Tính tiền</h5>
            <div class="mb-4">
              <div class="flex justify-between">
                <span>Đơn hàng:</span>
                <span class="font-medium">{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between mt-2">
                <span class="font-bold">Tổng tiền:</span>
                <span class="font-bold text-red-600">{{
                  formatPrice(cartTotal)
                }}</span>
              </div>
              <p class="text-sm text-gray-500">(including VAT)</p>
            </div>
            <v-btn
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Thanh toán
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import cartStore from "../store/cartStore";

export default {
  data() {
    return {
      paymentIcons: [
        {
          src: "https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg",
          alt: "Visa",
        },
        {
          src: "https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg",
          alt: "American Express",
        },
        {
          src: "https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg",
          alt: "Mastercard",
        },
        {
          src: "https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp",
          alt: "PayPal",
        },
      ],
    };
  },
  computed: {
    cartItems() {
      return cartStore.cartItems;
    },
    cartTotal() {
      return this.cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      );
    },
  },
  methods: {
    formatPrice(price) {
      return price
        ? `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`
        : "0 VNĐ";
    },
    removeItem(index) {
      const itemQuantity = this.cartItems[index].quantity;
      cartStore.cartCount -= itemQuantity;
      cartStore.cartItems.splice(index, 1);
      cartStore.saveCart();
    },
    moveToWishlist(index) {
      console.log("Move item to wishlist", this.cartItems[index]);
    },
    increaseQuantity(index) {
      cartStore.cartItems[index].quantity++;
      cartStore.saveCart();
    },
    decreaseQuantity(index) {
      if (cartStore.cartItems[index].quantity > 1) {
        cartStore.cartItems[index].quantity--;
        cartStore.saveCart();
      }
    },
  },
  created() {
    cartStore.loadCart();
  },
  mounted() {
    this.cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    this.cartCount = parseInt(sessionStorage.getItem("cartCount"), 10) || 0;
  },
};
</script>

<style scoped>
.h-full {
  min-height: 100vh;
}
</style>
