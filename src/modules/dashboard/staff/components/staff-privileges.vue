<template>
  <div class="privileges">
    <StaffPrivilegesItem
      v-for="privilegeItem in privilegesItems"
      :key="privilegeItem.privilege"
      class="item"
      :current-value="privilegeItem.value"
      :privilege="privilegeItem.privilege"
      :staff-id="staffId"
      @update="updatePrivilege"
    />
  </div>
</template>

<script setup lang="ts">
import { DashboardModulesEnum } from '../../enums/dashboard-modules.enum';
import { Privileges } from '../models/privileges';
import { useStaffStore } from '../staff.store';
import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';
import StaffPrivilegesItem from './staff-privileges-item.vue';
import { IDashboardPrivileges } from '../../interfaces/IDashoardPrivileges';

const props = defineProps({
  staffId: {
    type: Number,
    required: true,
  },
});

const staffStore = useStaffStore();
const privileges = ref(new Privileges());

function updatePrivilege(
  privilege: DashboardModulesEnum,
  value: PrivilegesEnum,
): void {
  privileges.value.setPrivilege(privilege, value);
}

onMounted(() => {
  const member = staffStore.getMember(props.staffId);
  if (member) {
    privileges.value = member.privileges;
  }
});

const privilegesItems = computed(() => {
  return Object.entries(privileges.value).map(([key, value]) => ({
    privilege: key as DashboardModulesEnum,
    value: value as PrivilegesEnum,
  }));
});

function getNewPrivileges(): IDashboardPrivileges {
  return privileges.value.getDataForUpdate();
}

defineExpose({ getNewPrivileges });
</script>
