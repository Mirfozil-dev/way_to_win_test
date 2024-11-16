<template>
  <header class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-10">
    <main-nav />
    <slot />
    <Snackbar />
  </header>
</template>

<script setup lang="ts">
import Snackbar from "@/components/Snackbar.vue";
import MainNav from "@/layouts/navigation/MainNav.vue";
</script>