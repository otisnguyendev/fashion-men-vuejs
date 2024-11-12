<template>
  <div class="bg-teal-500 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-4">Register Account Form</h2>
      <div class="border-t-2 border-gray-300 w-16 mx-auto mb-6"></div>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Username</label>
          <div class="relative">
            <input
              type="text"
              v-model="username"
              placeholder="Your Name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-user text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <div class="relative">
            <input
              type="email"
              v-model="email"
              placeholder="Your Email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-envelope text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Password</label>
          <div class="relative">
            <input
              type="password"
              v-model="password"
              placeholder="Your Password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-lock text-gray-400"></i>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleRegister = () => {
      localStorage.setItem("username", username.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);

      console.log("Registering:", username.value, email.value, password.value);
      router.push("/login");
    };

    return {
      username,
      email,
      password,
      handleRegister,
    };
  },
};
</script>
