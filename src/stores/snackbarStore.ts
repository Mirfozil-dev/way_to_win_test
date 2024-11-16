import { defineStore } from 'pinia';
import { ref } from 'vue';
import {SnackbarStatus} from "@/types";

export const useSnackbarStore = defineStore('snackbar', () => {
    const visible = ref(false);
    const message = ref('');
    const type = ref<SnackbarStatus>(SnackbarStatus.INFO);

    const showSnackbar = (msg: string,  snackbarType: SnackbarStatus = SnackbarStatus.INFO) => {
        visible.value = true;
        message.value = msg;
        type.value = snackbarType;

        setTimeout(() => {
            visible.value = false;
        }, 3000);
    };

    const hideSnackbar = () => {
        visible.value = false;
    };

    return {
        visible,
        message,
        type,
        showSnackbar,
        hideSnackbar,
    };
});
