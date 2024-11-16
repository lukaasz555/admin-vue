<template>
  <div class="privileges">
    <StaffPrivilegesItem
      v-for="(privilegeItem, index) in privilegesItems"
      :key="index"
      class="item"
      :current-value="privilegeItem.value"
      :privilege="privilegeItem.privilege"
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
  return Object.entries(privileges.value).map(
    ([key, value]) =>
      ({
        privilege: key,
        value,
      }) as {
        privilege: DashboardModulesEnum;
        value: PrivilegesEnum;
      },
  );
});
</script>

<style scoped lang="scss">
.privileges {
  .item {
    // ...
  }
}
</style>
