<template>
  <label class="flex items-center space-x-3 cursor-pointer">
    <input
        type="checkbox"
        class="hidden peer"
        :checked="model"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    <div
        class="w-5 h-5 border-2 border-gray-400 rounded-lg flex justify-center items-center peer-checked:border-blue-500 peer-checked:bg-blue-500 transition hover:border-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
    >
      <svg
          v-if="model"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span class="text-gray-700 text-sm md:text-base font-medium">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const model = defineModel<boolean>()

defineProps({
  label: String,
});
</script>
