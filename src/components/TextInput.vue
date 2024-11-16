<template>
  <div class="mb-4">
    <label class="block font-medium text-sm md:text-base text-gray-700">{{ label }}</label>
    <Field
        v-model="model"
        :name="name"
        as="input"
        v-bind="fieldAttrs"
        :class="[
        'w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none text-zinc-800',
        errors[name] ? 'border-red-500' : 'text-zinc-800 border-gray-300'
      ]"
        :placeholder="placeholder"
    />
    <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { defineProps } from 'vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: String,
  fieldAttrs: Object,
});

const model = defineModel()

import { useFormContext } from 'vee-validate';
const { errors } = useFormContext();
</script>
