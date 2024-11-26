<template>
  <div class="item">
    <Select
      v-model="selectedPrivilege"
      :disabled="!staffPrivileges.length"
      :items="staffPrivileges"
      :label="privilege"
      @update:model-value="updatePrivilege"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';
import { DashboardModulesEnum } from '../../enums/dashboard-modules.enum';
import { rolePrivelegeLimits as limit } from '../../data/privilege-limits';
import { getPrivilegeName } from '../helpers/privileges.helpers';
import { SelectItemType } from '@/global/types/select-item.type';
import { useStaffStore } from '../staff.store';
import Select from '@/global/components/select.vue';
import i18n from '@/plugins/i18n';

type PrivilegesItemEmit = {
  (
    e: 'update',
    privilege: DashboardModulesEnum,
    value: PrivilegesEnum,
  ): void;
};

const emit = defineEmits<PrivilegesItemEmit>();

const selectedPrivilege = computed<SelectItemType>({
  get: () => ({
    value: props.currentValue,
    displayText: i18n.global.t(getPrivilegeName(props.currentValue)),
  }),
  set: (val) => {
    const privilege = staffPrivileges.value.find(
      (p) => p.value === val.value,
    );
    if (!privilege) throw new Error('Privilege not found');
    emit(
      'update',
      props.privilege,
      privilege.value as PrivilegesEnum,
    );
  },
});

const props = defineProps({
  privilege: {
    type: String as PropType<DashboardModulesEnum>,
    required: true,
  },
  currentValue: {
    type: String as PropType<PrivilegesEnum>,
    required: true,
  },
  staffId: {
    type: Number,
    required: true,
  },
});
const staffStore = useStaffStore();

const staffPrivileges = computed<SelectItemType[]>(() => {
  const member = staffStore.getMember(props.staffId);
  if (!member) return [];

  const permissions = limit[member.role][props.privilege];

  if (permissions) {
    return permissions.map((privilege) => ({
      value: privilege,
      displayText: i18n.global.t(getPrivilegeName(privilege)),
    }));
  }
  return [];
});

function updatePrivilege(item: SelectItemType): void {
  const privilege = staffPrivileges.value.find(
    (p) => p.value === item.value,
  )?.value;
  if (privilege) {
    emit('update', props.privilege, privilege as PrivilegesEnum);
  }
}
</script>

<style scoped lang="scss">
.item {
  // ...
}
</style>
