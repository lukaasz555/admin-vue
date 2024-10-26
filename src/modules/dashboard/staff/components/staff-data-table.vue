<template>
  <v-data-table-virtual
    :headers="staffTableHeaders"
    :items="staffStore.staffMembers"
  >
  </v-data-table-virtual>
</template>

<script setup lang="ts">
import { useStaffStore } from '../staff.store';
import { staffTableHeaders } from '../utils/staff-table-headers';

const staffStore = useStaffStore();
</script>
