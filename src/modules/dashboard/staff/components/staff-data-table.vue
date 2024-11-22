<template>
  <v-data-table-virtual
    :headers="staffTableHeaders"
    :items="staffMembers"
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
import { staffTableHeaders } from '../utils/staff-table-headers';
import { StaffMember } from '../models/staff-member';
import TableActionButtons from '../../components/table-action-buttons.vue';

type StaffDataTableEmits = {
  (e: 'deleteStaff', staffId: number): void;
  (e: 'editStaff', staffId: number): void;
};

const emit = defineEmits<StaffDataTableEmits>();

defineProps({
  staffMembers: {
    type: Array as PropType<StaffMember[]>,
    required: true,
  },
});

function onEditClick(staffId: number): void {
  emit('editStaff', staffId);
}

function onDeleteClick(staffId: number): void {
  emit('deleteStaff', staffId);
}
</script>
