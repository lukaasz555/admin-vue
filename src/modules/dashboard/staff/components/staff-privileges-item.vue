<template>
  <div class="item">
    Privilege: {{ privilege }}, Value: {{ currentValue }}
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DashboardModulesEnum } from '../../enums/dashboard-modules.enum';
import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';

type PrivilegesItemEmit = {
  (
    e: 'update',
    privilege: DashboardModulesEnum,
    value: PrivilegesEnum,
  ): void;
};

const emit = defineEmits<PrivilegesItemEmit>();

const props = defineProps({
  privilege: {
    type: String as PropType<DashboardModulesEnum>,
    required: true,
  },
  currentValue: {
    type: String as PropType<PrivilegesEnum>,
    required: true,
  },
});

function updatePrivilege(): void {
  emit('update', props.privilege, PrivilegesEnum.READONLY);
}
</script>

<style scoped lang="scss">
.item {
  // ...
}
</style>
