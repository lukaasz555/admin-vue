<template>
  <v-dialog v-model="isDialogVisible">
    <div class="container">
      <header>
        <h2>{{ title }}</h2>
      </header>
      <section>
        <p>{{ message }}</p>
      </section>
      <footer>
        <Button
          :label="$t('Confirm')"
          :role="buttonRole"
          @click="emit('confirm')"
        />
        <Button
          :label="$t('Cancel')"
          variant="outlined"
          @click="emit('close')"
        />
      </footer>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDialog } from '@/global/composables/useDialog';
import Button from '@/global/components/button.vue';
import { DialogTypeEnum } from '@/global/enums/dialog-type.enum';

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'close'): void;
}>();

const props = defineProps({
  isDialogVisible: { type: Boolean, default: false },
});

const { title, message, dialogType } = useDialog();

const buttonRole = computed(() =>
  dialogType.value === DialogTypeEnum.DELETE ? 'delete' : 'default',
);

const isDialogVisible = computed({
  get: () => props.isDialogVisible,
  set: () => emit('close'),
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  border-radius: $border-radius-l;
  padding: 1rem;
  background-color: $color-background;

  footer {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    align-items: center;
  }
}
</style>
