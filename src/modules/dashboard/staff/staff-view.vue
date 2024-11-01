<template>
  <div>
    <!-- Temp. here - move to popup after KF-6 merge -->
    <StaffForm
      :form-action-type="staffFormAction"
      @add="addStaffMember"
      @edit="editStaffMember"
    />
  </div>
</template>

<script setup lang="ts">
import { ActionType } from '../enums/action-type.enum';
import { StaffData } from './models/staff-data';
import StaffForm from './components/staff-form.vue';

const staffFormAction = ref(ActionType.ADD);

function addStaffMember(staffData: StaffData): void {
  console.log(staffData);
}
function editStaffMember(staffData: StaffData): void {
  console.log(staffData);
}

function openEditForm(): void {
  staffFormAction.value = ActionType.EDIT;
}

function openAddForm(): void {
  staffFormAction.value = ActionType.ADD;
}
</script>
