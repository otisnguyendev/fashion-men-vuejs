<template>
  <section class="h-full bg-gradient-to-r from-purple-500 to-blue-600 py-10">
    <v-container>
      <Navbar />
      <v-row class="justify-center my-6">
        <v-col md="8">
          <v-card class="mb-6 shadow-lg rounded-lg">
            <v-card-title>
              <h5 class="text-2xl font-bold text-gray-800">Giỏ hàng của bạn</h5>
            </v-card-title>
            <v-card-text>
              <div
                v-for="(item, index) in cartItems"
                :key="index"
                class="flex flex-col md:flex-row items-center mb-6 bg-white shadow-sm rounded-lg p-4"
              >
                <v-img
                  :src="item.imageSrc"
                  class="w-full md:w-1/5 aspect-[4/3] rounded-md object-cover mb-4 md:mb-0"
                  contain
                ></v-img>

                <div class="flex-1 md:px-6">
                  <p class="font-semibold text-xl text-gray-900">
                    {{ item.title }}
                  </p>
                  <p class="mt-2 text-gray-600">
                    <strong>Màu sắc:</strong> {{ item.color }}
                  </p>
                  <p class="mt-2 text-gray-600">
                    <strong>Kích thước:</strong> {{ item.size }}
                  </p>

                  <v-select
                    v-model="item.shippingMethod"
                    :items="['Giao hàng nhanh', 'Giao hàng tiết kiệm']"
                    label="Phương thức giao hàng"
                    dense
                    class="mt-4"
                  ></v-select>

                  <div class="flex space-x-4 mt-4">
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
                      min="1"
                      dense
                      outlined
                      class="mx-2 w-16 text-center"
                    ></v-text-field>
                    <v-btn
                      icon
                      color="primary"
                      @click="increaseQuantity(index)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <p class="font-semibold text-lg text-blue-600">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="shadow-lg rounded-lg">
            <v-card-text>
              <div class="flex justify-between items-center">
                <p class="text-lg font-semibold">Phương thức thanh toán</p>
                <div class="flex space-x-4">
                  <v-img
                    v-for="icon in paymentIcons"
                    :key="icon.alt"
                    :src="icon.src"
                    width="40"
                  ></v-img>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col md="4">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h5 class="text-xl font-bold text-gray-800 mb-6">Tính tiền</h5>
            <div class="space-y-4">
              <div class="flex justify-between text-gray-700">
                <span>Đơn hàng:</span>
                <span class="font-medium">{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-800 font-semibold">
                <span class="font-bold">Tổng tiền:</span>
                <span class="text-red-600 font-bold">{{
                  formatPrice(cartTotal)
                }}</span>
              </div>
              <p class="text-sm text-gray-500">(Đã bao gồm VAT)</p>
            </div>
            <v-btn
              class="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg py-3 mt-4"
              @click="handleCheckout"
            >
              Thanh toán
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showCheckoutDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5 font-bold"
          >Thông tin thanh toán</v-card-title
        >
        <v-card-text>
          <v-form ref="checkoutForm" v-model="valid" lazy-validation>
            <v-text-field
              label="Họ và tên"
              v-model="checkoutData.username"
              :rules="[(v) => !!v || 'Họ và tên là bắt buộc']"
              required
            ></v-text-field>
            <v-text-field
              label="Số điện thoại"
              v-model="checkoutData.phone"
              :rules="[(v) => !!v || 'Số điện thoại là bắt buộc']"
              required
            ></v-text-field>
            <v-text-field
              label="Địa chỉ"
              v-model="checkoutData.address"
              :rules="[(v) => !!v || 'Địa chỉ là bắt buộc']"
              required
            ></v-text-field>
            <v-radio-group
              v-model="checkoutData.paymentMethod"
              :rules="[(v) => !!v || 'Vui lòng chọn phương thức thanh toán']"
            >
              <v-radio label="Chuyển khoản" value="transfer"></v-radio>
              <v-radio label="Ship COD" value="cod"></v-radio>
            </v-radio-group>
            <v-if v-if="checkoutData.paymentMethod === 'transfer'">
              <v-img :src="qrCodeImage" alt="QR Code" max-width="300" />
            </v-if>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="showCheckoutDialog = false"
            >Hủy</v-btn
          >
          <v-btn color="primary" :disabled="!valid" @click="processCheckout"
            >Xác nhận</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="3000" top color="success">
      Thanh toán thành công!
    </v-snackbar>
  </section>
</template>

<script>
import cartStore from "../store/cartStore";

export default {
  data() {
    return {
      isLoggedIn: false,
      showCheckoutDialog: false,
      valid: false,
      snackbar: false,
      checkoutData: {
        username: "",
        phone: "",
        address: "",
        paymentMethod: null,
      },
      qrCodeImage:
        "https://th.bing.com/th/id/OIP.NRGOtlvGGuaNbayirCXPUQHaHX?rs=1&pid=ImgDetMain",
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
    handleCheckout() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: "Login" });
      } else {
        this.showCheckoutDialog = true;
      }
    },
    processCheckout() {
      console.log("Thanh toán thành công!");
      cartStore.cartItems = [];
      cartStore.cartCount = 0;
      cartStore.saveCart();
      this.showCheckoutDialog = false;

      setTimeout(() => {
        this.snackbar = true;
      }, 500);
    },
    login() {
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
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
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style scoped>
.h-full {
  min-height: 100vh;
}
</style>
