import { reactive } from "vue";

interface Item {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  quantity: number;
  color?: string;
  size?: string;
}

const cartStore = reactive<{
  cartCount: number;
  cartItems: Item[];
  incrementCartCount: () => void;
  addItem: (item: Item) => void;
  saveCart: () => void;
  loadCart: () => void;
  removeItem: (itemId: number) => void;
}>({
  cartCount: 0,
  cartItems: [],

  incrementCartCount() {
    this.cartCount++;
    this.saveCart();
  },

  addItem(item: Item) {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      this.cartCount -= existingItem.quantity;
      existingItem.quantity += item.quantity || 1;
      this.cartCount += existingItem.quantity;
    } else {
      this.cartItems.push({
        id: item.id,
        title: item.title || "Tên chưa xác định",
        price: item.price || 0,
        imageSrc: item.imageSrc || "",
        quantity: item.quantity || 1,
        color: item.color || "",
        size: item.size || "",
      });
      this.cartCount++;
    }
    this.saveCart();
    console.log("Adding item to cart:", item);
  },

  removeItem(itemId: number) {
    const index = this.cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      this.cartCount -= this.cartItems[index].quantity;
      this.cartItems.splice(index, 1);
      this.saveCart();
    }
  },

  saveCart() {
    sessionStorage.setItem("cart", JSON.stringify(this.cartItems));
    sessionStorage.setItem("cartCount", this.cartCount.toString());
    console.log("Cart items before saving:", this.cartItems);
  },

  loadCart() {
    const storedCart = sessionStorage.getItem("cart");
    const storedCount = sessionStorage.getItem("cartCount");

    if (storedCart) {
      this.cartItems = JSON.parse(storedCart).map((item: Item) => ({
        id: item.id,
        title: item.title || "Tên chưa xác định",
        price: item.price || 0,
        imageSrc: item.imageSrc || "",
        quantity: item.quantity || 1,
        color: item.color || "",
        size: item.size || "",
      }));
    }

    if (storedCount) {
      this.cartCount = parseInt(storedCount, 10);
    }
  },
});

cartStore.loadCart();

export default cartStore;
