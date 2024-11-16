<template>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto border-collapse border border-gray-300 bg-white rounded-lg shadow-lg">
      <thead class="bg-gradient-to-r from-gray-100 to-gray-200">
      <tr>
        <th class="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800">ФИО</th>
        <th class="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800">Отделение</th>
        <th v-if="isDoctor" class="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800">Заведующий</th>
        <th class="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="person in people"
          :key="person.id"
          class="even:bg-gray-50 hover:bg-indigo-50 transition duration-150 ease-in-out"
      >
        <td class="border border-gray-300 px-4 py-2 text-gray-800">{{ person.name }}</td>
        <td class="border border-gray-300 px-4 py-2 text-gray-800">{{ person.department }}</td>
        <td v-if="isDoctor" class="border border-gray-300 px-4 py-2 text-gray-800">
          {{ person.isHead ? 'Да' : 'Нет' }}
        </td>
        <td class="border border-gray-300 px-4 py-2 text-gray-800 flex gap-2">
          <button
              @click="edit(person)"
              class="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow-md hover:scale-105 transition"
          >
            Изменить
          </button>
          <button
              @click="remove(person.id)"
              class="px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:scale-105 transition"
          >
            Удалить
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Doctor, Nurse } from "@/types";

const props = defineProps({
  people: {
    type: Array<Doctor | Nurse>,
    required: true,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['edit', 'remove']);

const edit = (person: Doctor | Nurse) => emit('edit', person);
const remove = (id: number) => emit('remove', id);
</script>

<style scoped>
@media (max-width: 640px) {
  table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  th, td {
    white-space: nowrap;
  }
}
</style>
