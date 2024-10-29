import { ref } from 'vue';

const isVisible = ref(false);
const title = ref('');
const message = ref('');
const onConfirm = ref<() => void>(() => {});

export const useDialog = () => {
  function openDialog(
    dialogTitle: string,
    dialogMessage: string,
    onDialogConfirm: () => void,
  ): void {
    title.value = dialogTitle;
    message.value = dialogMessage;
    isVisible.value = true;
    onConfirm.value = onDialogConfirm;
  }

  const closeDialog = () => {
    title.value = '';
    message.value = '';
    isVisible.value = false;
    onConfirm.value = () => {};
  };

  return {
    isVisible,
    openDialog,
    closeDialog,
    title,
    message,
    onConfirm,
  };
};
