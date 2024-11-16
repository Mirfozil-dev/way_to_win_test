<template>
  <div v-show="visible" :class="`snackbar ${type}`">
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { useSnackbarStore } from "@/stores/snackbarStore";
import { computed } from "vue";

const snackbarStore = useSnackbarStore();
const visible = computed(() => snackbarStore.visible);
const message = computed(() => snackbarStore.message);
const type = computed(() => snackbarStore.type);
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 10%;
  left: 50%;
  width: fit-content;
  max-width: 500px;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  opacity: 0;
  animation: slide-up 0.3s forwards;
  z-index: 1000;
}

.snackbar.success {
  background-color: #4caf50;
}

.snackbar.error {
  background-color: #f44336;
}

.snackbar.info {
  background-color: #2196f3;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
