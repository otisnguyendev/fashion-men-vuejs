<template>
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-80">
        <div class="mb-4">
          <i class="fas fa-user-circle text-6xl text-blue-500"></i>
        </div>
        <h2 class="text-2xl font-semibold mb-6">Sign In</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <input
              type="text"
              v-model="username"
              placeholder="Username"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          <div class="flex items-center justify-between text-sm mb-4">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox text-blue-500" />
              <span class="ml-2">Remember Me</span>
            </label>
            <a href="#" class="text-blue-500 hover:underline"
              >Forgot Password</a
            >
          </div>
          <router-link to="/register">
            <button
              type="button"
              class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Register
            </button>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = () => {
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (
        username.value === storedUsername &&
        password.value === storedPassword
      ) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/");
      } else {
        alert("Invalid username or password.");
      }
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped></style>
