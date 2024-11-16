<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-center text-green-600">Список медсестер</h1>
    <button
        @click="openAddModal"
        class="mb-4 w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md text-sm md:text-base font-medium hover:scale-105 transform transition"
    >
      Добавить медсестеру
    </button>
    <DataTable :people="store.nurses" :isDoctor="false" @edit="openEditModal" @remove="deleteNurse" />
    <Modal
        :isOpen="isModalOpen"
        :title="modalTitle"
        @close="closeModal"
        @confirm="onSubmit"
    >
      <form @submit.prevent>
        <TextInput
            v-model="currentNurse.name"
            name="name"
            label="ФИО"
            placeholder="Введите ФИО"
            :fieldAttrs="{ type: 'text' }"
        />

        <SelectInput
            v-model="currentNurse.department"
            name="department"
            label="Отделение"
            placeholder="Выберите отделение"
        >
          <option value="Кардиологическое">Кардиологическое</option>
          <option value="Хирургическое">Хирургическое</option>
        </SelectInput>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import type { Nurse } from "@/types";
import { useStaffStore } from "@/stores/staffStore";
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import SelectInput from "@/components/SelectInput.vue";
import TextInput from "@/components/TextInput.vue";

const store = useStaffStore();
const isModalOpen = ref(false);
const modalTitle = ref('');
const currentNurse = ref<Nurse>({ id: 0, name: '', department: '' });

const validationSchema = yup.object({
  name: yup.string().required('ФИО обязательно').min(3, 'ФИО должно содержать минимум 3 символа'),
  department: yup.string().required('Отделение обязательно'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: currentNurse.value,
});

const clearForm = () => {
  currentNurse.value = { id: 0, name: '', department: '' };
  resetForm()
}

const openAddModal = () => {
  modalTitle.value = 'Добавить медсестру';
  isModalOpen.value = true;
};

const openEditModal = (nurse: Nurse) => {
  modalTitle.value = 'Изменить медсестру';
  currentNurse.value = { ...nurse };
  isModalOpen.value = true;
};

const closeModal = () => {
  clearForm()
  isModalOpen.value = false
}

const saveNurse = () => {
  if (currentNurse.value.id) {
    store.editNurse(currentNurse.value);
  } else {
    store.addNurse(currentNurse.value);
  }
  closeModal();
};

const deleteNurse = (id: number) => store.deleteNurse(id);

const onSubmit = handleSubmit(() => saveNurse());

store.loadNurses();
</script>
