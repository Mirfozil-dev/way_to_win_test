<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
  >
    <div class="bg-white rounded-lg p-4 md:p-6 shadow-xl w-full max-w-lg transition-all transform scale-100">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4">{{ title }}</h2>
      <slot></slot>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="close"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
        >
          Отмена
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String,
});

const emit = defineEmits(['close', 'confirm']);

const close = () => emit('close');
const confirm = () => emit('confirm');
</script>
