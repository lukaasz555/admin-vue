<template>
  <v-data-table-virtual
    :headers="staffTableHeaders"
    :items="staffStore.staffMembers"
  >
    <template #item.actions="{ item }">
      <TableActionButtons
        :item-id="item.id"
        @delete="onDeleteClick"
        @edit="onEditClick"
      />
    </template>
  </v-data-table-virtual>
</template>

<script setup lang="ts">
import { useStaffStore } from '../staff.store';
import { staffTableHeaders } from '../utils/staff-table-headers';
import TableActionButtons from '../../components/table-action-buttons.vue';

const staffStore = useStaffStore();

const emit = defineEmits<{
  (e: 'deleteStaff', staffId: number): void;
}>();

function onEditClick(staffId: number): void {
  // TODO: KF-7
}

function onDeleteClick(staffId: number): void {
  emit('deleteStaff', staffId);
}
</script>
