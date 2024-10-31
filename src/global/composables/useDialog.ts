import { ref } from 'vue';
import { DialogTypeEnum } from '../enums/dialog-type.enum';

const isVisible = ref(false);
const title = ref('');
const message = ref('');
const onConfirm = ref<() => void>(() => {});
const dialogType = ref(DialogTypeEnum.DEFAULT);

export const useDialog = () => {
  function openDialog(
    dialogTitle: string,
    dialogMessage: string,
    onDialogConfirm: () => void,
    type = DialogTypeEnum.DEFAULT,
  ): void {
    title.value = dialogTitle;
    message.value = dialogMessage;
    isVisible.value = true;
    onConfirm.value = onDialogConfirm;
    dialogType.value = type;
  }

  const closeDialog = () => {
    title.value = '';
    message.value = '';
    isVisible.value = false;
    onConfirm.value = () => {};
    dialogType.value = DialogTypeEnum.DEFAULT;
  };

  return {
    isVisible,
    openDialog,
    closeDialog,
    title,
    message,
    onConfirm,
    dialogType,
  };
};
