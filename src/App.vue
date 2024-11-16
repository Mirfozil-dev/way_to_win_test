<template>
  <header class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-10">
    <nav class="container mx-auto flex justify-between items-center px-4 py-4">
      <div class="hidden md:flex items-center space-x-4">
        <router-link
            to="/doctors"
            class="hover:underline text-lg font-semibold"
            :class="{ 'underline decoration-white': route.path === '/doctors' }"
            @click="closeMenu"
        >
          Врачи
        </router-link>
        <router-link
            to="/nurses"
            class="hover:underline text-lg font-semibold"
            :class="{ 'underline decoration-white': route.path === '/nurses' }"
            @click="closeMenu"
        >
          Медсестры
        </router-link>
      </div>

      <button
          class="md:hidden px-4 py-2 bg-indigo-500 rounded-lg text-sm font-medium hover:bg-indigo-600"
          @click="toggleMenu"
      >
        Меню
      </button>
    </nav>

    <transition name="menu">
      <div
          v-show="isMenuOpen"
          class="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 shadow-lg space-y-4"
      >
        <router-link
            to="/doctors"
            class="block text-lg font-semibold hover:underline"
            :class="{ 'underline decoration-white': route.path === '/doctors' }"
            @click="closeMenu"
        >
          Врачи
        </router-link>
        <router-link
            to="/nurses"
            class="block text-lg font-semibold hover:underline"
            :class="{ 'underline decoration-white': route.path === '/nurses' }"
            @click="closeMenu"
        >
          Медсестры
        </router-link>
      </div>
    </transition>
    <main class="p-4 md:p-6 bg-gray-50 min-h-screen">
      <router-view />
    </main>
    <Snackbar />
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Snackbar from "@/components/Snackbar.vue";

const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


