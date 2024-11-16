import {ref} from 'vue';
import {defineStore} from 'pinia';
import {type Doctor, type Nurse, SnackbarStatus} from "@/types";
import axios from "axios";
import {useSnackbarStore} from "@/stores/snackbarStore";
import {generateID} from "@/utils";

export const useStaffStore = defineStore('staff', () => {
    const doctors = ref<Doctor[]>([]);
    const nurses = ref<Nurse[]>([]);

    const loadingDoctors = ref(false);
    const loadingNurses = ref(false);
    const snackbarStore = useSnackbarStore();

    const loadDoctors = async () => {
        loadingDoctors.value = true;
        try {
            const response = await axios.get('/mock/doctors.json');
            doctors.value = response.data;
            snackbarStore.showSnackbar('Список врачов загрузилось успешно', SnackbarStatus.SUCCESS)
        } catch (error) {
            snackbarStore.showSnackbar('Не удалось загрузить список врачов', SnackbarStatus.ERROR)
        } finally {
            loadingDoctors.value = false;
        }
    };

    const loadNurses = async () => {
        loadingNurses.value = true;
        try {
            const response = await axios.get('/mock/nurses.json');
            nurses.value = response.data;
            snackbarStore.showSnackbar('Список медсестер загрузилось успешно', SnackbarStatus.SUCCESS)
        } catch (error) {
            snackbarStore.showSnackbar('Не удалось загрузить список медсестер', SnackbarStatus.ERROR)
        } finally {
            loadingNurses.value = false;
        }
    };

    const addDoctor = (doctor: Doctor) => {
        doctors.value.push({ ...doctor, id: generateID() });
    };

    const editDoctor = (doctor: Doctor) => {
        const index = doctors.value.findIndex((doc) => doc.id === doctor.id);
        if (index !== -1) doctors.value[index] = doctor;
    };

    const deleteDoctor = (id: number) => {
        doctors.value = doctors.value.filter((doctor) => doctor.id !== id);
    };

    const addNurse = (nurse: Nurse) => {
        nurses.value.push({ ...nurse, id: generateID() });
    };

    const editNurse = (nurse: Nurse) => {
        const index = nurses.value.findIndex((n) => n.id === nurse.id);
        if (index !== -1) nurses.value[index] = nurse;
    };

    const deleteNurse = (id: number) => {
        nurses.value = nurses.value.filter((nurse) => nurse.id !== id);
    };

    return {
        doctors,
        nurses,
        addDoctor,
        editDoctor,
        deleteDoctor,
        addNurse,
        editNurse,
        deleteNurse,
        loadDoctors,
        loadNurses
    };
});
