<template>
  <div>
    <StaffDataTable />
  </div>
  <Loader :is-loading="isLoading" />
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import StaffDataTable from './components/staff-data-table.vue';
import { getStaffMembers } from './service/staff.service';
import { useStaffStore } from './staff.store';
import Loader from '../components/loader.vue';

const staffStore = useStaffStore();

const { isLoading } = useQuery({
  queryKey: ['getStaffMembers'],
  queryFn: async () => {
    const res = await getStaffMembers();
    staffStore.staffMembers = res;
    return res;
  },
});
</script>
