<template>
  <StaffForm @confirm="addStaffMember" />
</template>

<script setup lang="ts">
import { StaffData } from '../models/staff-data';
import StaffForm from './staff-form.vue';
import { staffService } from '../staff.service';

async function addStaffMember(staffData: StaffData): Promise<void> {
  staffService.createStaff(staffData);
}
</script>
