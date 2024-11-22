import { ref } from 'vue';
import { DialogTypeEnum } from '../enums/dialog-type.enum';
import { TranslateResult } from 'vue-i18n';

export interface IDialogOptions {
  title: TranslateResult;
  message?: TranslateResult;
  onConfirm: () => void;
  type?: DialogTypeEnum;
  confirmButtonText?: TranslateResult;
  cancelButtonText?: TranslateResult;
}

const isVisible = ref(false);
const title = ref('');
const message = ref('');
const onConfirm = ref<() => void>(() => {});
const dialogType = ref(DialogTypeEnum.DEFAULT);

export const useDialog = () => {
  function openDialog(options: IDialogOptions): void {
    title.value = options.title;
    message.value = options.message ?? '';
    onConfirm.value = options.onConfirm;
    dialogType.value = options.type || DialogTypeEnum.DEFAULT;
    isVisible.value = true;
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
