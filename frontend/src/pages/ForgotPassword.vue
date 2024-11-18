<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="shadow-lg rounded-lg">
          <v-card-title class="headline text-center">
            Quên mật khẩu
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit" class="space-y-6">
              <v-text-field
                v-model="email"
                label="Email"
                :disabled="otpSent"
                class="w-full"
              ></v-text-field>

              <v-btn
                @click="handleSubmit"
                color="primary"
                :disabled="otpSent"
                block
                class="rounded-full"
              >
                Gửi OTP
              </v-btn>
            </v-form>

            <v-alert v-if="otpSent" type="success" class="mt-4 text-center">
              Mã OTP đã được gửi đến email của bạn: {{ otp }}
            </v-alert>

            <v-form
              v-if="otpSent && !passwordUpdated"
              @submit.prevent="handleUpdatePassword"
              class="space-y-6 mt-4"
            >
              <v-text-field
                v-model="password"
                label="Nhập mật khẩu mới"
                type="password"
                required
                class="w-full"
              ></v-text-field>

              <v-btn
                @click="handleUpdatePassword"
                color="primary"
                :disabled="!password"
                block
                class="rounded-full"
              >
                Cập nhật mật khẩu
              </v-btn>
            </v-form>

            <v-alert
              v-if="passwordUpdated"
              type="success"
              class="mt-4 text-center"
            >
              Mật khẩu đã được cập nhật thành công!
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const otp = ref("");
    const password = ref("");
    const otpSent = ref(false);
    const passwordUpdated = ref(false);
    const router = useRouter();

    const savedEmail = localStorage.getItem("email") || "";
    email.value = savedEmail;

    const handleSubmit = () => {
      if (!email.value) {
        alert("Email không hợp lệ!");
        return;
      }

      if (email.value !== savedEmail) {
        alert("Email không khớp với email đã lưu!");
        return;
      }

      otp.value = generateOtp();
      otpSent.value = true;
      console.log("Mã OTP gửi về email: ", otp.value);
    };

    const handleUpdatePassword = () => {
      if (!password.value || password.value.trim() === "") {
        alert("Vui lòng nhập mật khẩu mới.");
        return;
      }

      localStorage.setItem("password", password.value);
      passwordUpdated.value = true;

      console.log("Mật khẩu đã được lưu:", password.value);

      setTimeout(() => {
        alert("Mật khẩu đã được cập nhật thành công!");
        router.push("/login");
      }, 1000);
    };

    const generateOtp = () => {
      const digits = "0123456789";
      let otp = "";
      for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
      }
      return otp;
    };

    return {
      email,
      otp,
      password,
      otpSent,
      passwordUpdated,
      handleSubmit,
      handleUpdatePassword,
    };
  },
};
</script>

<style scoped>
.v-card {
  max-width: 400px;
  margin: 0 auto;
}

.v-btn {
  margin-top: 20px;
}

.v-alert {
  margin-top: 10px;
}
</style>
