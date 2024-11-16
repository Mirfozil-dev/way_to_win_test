<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-600">Список врачей</h1>
    <button
        @click="openAddModal"
        class="mb-4 w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md text-sm md:text-base font-medium hover:scale-105 transform transition"
    >
      Добавить врача
    </button>
    <DataTable :people="store.doctors" :isDoctor="true" @edit="openEditModal" @remove="deleteDoctor" />
    <Modal
        :isOpen="isModalOpen"
        :title="modalTitle"
        @close="closeModal"
        @confirm="onSubmit"
    >
      <form @submit.prevent>
        <TextInput
            v-model="currentDoctor.name"
            name="name"
            label="ФИО"
            placeholder="Введите ФИО"
            :fieldAttrs="{ type: 'text' }"
        />

        <SelectInput
            v-model="currentDoctor.department"
            name="department"
            label="Отделение"
            placeholder="Выберите отделение"
        >
          <option value="Кардиологическое">Кардиологическое</option>
          <option value="Хирургическое">Хирургическое</option>
        </SelectInput>
        <div class="mb-4">
          <Checkbox
              v-model="currentDoctor.isHead"
              label="Заведующий"
          />
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStaffStore } from '@/stores/staffStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import DataTable from '@/components/DataTable.vue';
import Modal from '@/components/Modal.vue';
import type { Doctor } from "@/types";
import Checkbox from "@/components/Checkbox.vue";
import TextInput from "@/components/TextInput.vue";
import SelectInput from "@/components/SelectInput.vue";

const store = useStaffStore();

const isModalOpen = ref(false);
const modalTitle = ref('');
const currentDoctor = ref<Doctor>({ id: 0, name: '', department: '', isHead: false });

const validationSchema = yup.object({
  name: yup.string().required('ФИО обязательно').min(3, 'ФИО должно содержать минимум 3 символа'),
  department: yup.string().required('Отделение обязательно'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: currentDoctor.value,
});

const clearForm = () => {
  currentDoctor.value = { id: 0, name: '', department: '', isHead: false };
  resetForm()
}

const openAddModal = () => {
  modalTitle.value = 'Добавить врача';
  isModalOpen.value = true;
};

const openEditModal = (doctor: Doctor) => {
  modalTitle.value = 'Изменить врача';
  currentDoctor.value = { ...doctor };
  isModalOpen.value = true;
};

const saveDoctor = () => {
  if (currentDoctor.value.id) {
    store.editDoctor(currentDoctor.value);
  } else {
    store.addDoctor(currentDoctor.value);
  }
  closeModal();
};

const deleteDoctor = (id: number) => store.deleteDoctor(id);

const closeModal = () => {
  clearForm();
  isModalOpen.value = false
}

const onSubmit = handleSubmit(() => saveDoctor());

store.loadDoctors();
</script>
