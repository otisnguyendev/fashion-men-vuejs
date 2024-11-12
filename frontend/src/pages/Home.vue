<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <v-card flat>
          <v-tabs
            v-model="tab"
            color="deep-purple-accent-4"
            align-tabs="center"
          >
            <v-tab :value="1">Mới nhất</v-tab>
            <v-tab :value="2">Sản phẩm nổi bật</v-tab>
            <v-tab :value="3">Sản phẩm giá tốt</v-tab>
            <v-tab :value="4">Sản phẩm bán chạy</v-tab>
          </v-tabs>
          <v-window v-model="tab" class="mt-5">
            <v-window-item v-for="n in 4" :key="n" :value="n">
              <v-container fluid>
                <v-row>
                  <Product />
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Product from "@/components/Product.vue";
import Footer from "@/components/Footer.vue";
</script>

<script>
export default {
  data: () => ({
    tab: 1,
  }),
};
</script>

<style scoped></style>
