<template>
  <main-layout>
    <main class="p-4 md:p-6 bg-gray-50 min-h-screen">
      <router-view />
    </main>
  </main-layout>
</template>


<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
</script>