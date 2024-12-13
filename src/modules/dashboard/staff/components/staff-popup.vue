<template>
  <div class="staff-popup">
    <TabsMenu
      :items="tabItemsComputed"
      :selected-tab="currentTab"
      tabs-align="center"
      @change="currentTab = $event"
    />

    <v-tabs-window v-model="currentTab">
      <v-tabs-window-item :value="tabItemsComputed[0].value">
        <StaffForm
          ref="staffForm"
          :action-type="actionType"
          :can-edit-staff-role="permissions.canEditStaffRole"
          :staff-id="staffId"
        />
      </v-tabs-window-item>
      <v-tabs-window-item
        v-if="actionType === ActionType.EDIT"
        :value="tabItemsComputed[1].value"
      >
        <StaffPrivileges ref="staffPrivileges" :staff-id="staffId" />
      </v-tabs-window-item>
    </v-tabs-window>
    <div
      v-if="permissions.canAdd && permissions.canEditStaffData"
      class="mt-5 d-flex justify-center"
    >
      <Button
        :is-disabled="isAnyMutationPending"
        :is-loading="isAnyMutationPending"
        :label="confirmButtonLabel"
        @click="handleConfirm"
      />
      <Button
        :is-disabled="isAnyMutationPending"
        :label="$t('Cancel')"
        variant="text"
        @click="handleCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { staffService } from '../service/staff.service';
import { StaffData } from '../models/staff-data';
import { ActionType } from '../../enums/action-type.enum';
import { useMutation } from '@tanstack/vue-query';
import { useUserStore } from '@/global/store/user.store';
import { staffPopupTabItems } from '../utils/staff-popup-tab-items';
import { IDashboardPrivileges } from '../../interfaces/IDashoardPrivileges';
import { handleError, handleSuccess } from '../../utils/helpers';
import { DashboardModulesEnum } from '../../enums/dashboard-modules.enum';
import {
  getStaffPopupPermissions,
  IStaffPopupPermissions,
} from '../staff-popup.permissions';
import StaffPrivileges from './staff-privileges.vue';
import StaffForm from './staff-form.vue';
import TabsMenu from '../../components/tabs-menu.vue';
import Button from '@/global/components/button.vue';
import i18n from '@/plugins/i18n';

type StaffPopupEmits = {
  (e: 'close'): void;
  (e: 'refetch'): void;
};

const emit = defineEmits<StaffPopupEmits>();

const isAnyMutationPending = computed(() => {
  return (
    createStaffMutation.isPending.value ||
    editStaffMutation.isPending.value ||
    updatePrivilegesMutation.isPending.value
  );
});

const props = defineProps({
  staffId: {
    type: Number,
    required: true,
  },
  actionType: {
    type: String as PropType<ActionType>,
    default: ActionType.ADD,
  },
});

const tabItemsComputed = computed(() => {
  return props.actionType === ActionType.ADD
    ? staffPopupTabItems.filter((el) => el.value !== 'privileges')
    : staffPopupTabItems;
});

const permissions = computed<IStaffPopupPermissions>(() => {
  const modulePrivileges = useUserStore().getPrivilegesForModule(
    DashboardModulesEnum.STAFF_MEMBERS,
  );
  return getStaffPopupPermissions(modulePrivileges);
});

const confirmButtonLabel = computed(() =>
  props.actionType === ActionType.ADD
    ? i18n.global.t('Add')
    : i18n.global.t('Edit'),
);

const staffForm = ref<InstanceType<typeof StaffForm>>();
const staffPrivileges = ref<InstanceType<typeof StaffPrivileges>>();

const currentTab = ref(tabItemsComputed.value[0]);

function handleCancel(): void {
  staffForm.value?.resetForm();
  emit('close');
}

function onSuccessCallback(): void {
  emit('refetch');
  emit('close');
}

async function updateStaffData(staffData: StaffData): Promise<void> {
  editStaffMutation.mutateAsync(staffData);
}

async function updateStaffPrivileges(
  privileges: IDashboardPrivileges,
): Promise<void> {
  await updatePrivilegesMutation.mutateAsync({
    staffId: props.staffId,
    privileges,
  });
}

async function handleConfirm(): Promise<void> {
  const staffFormInstance = staffForm.value;
  const newPrivileges = staffPrivileges.value?.getNewPrivileges();

  if (!staffFormInstance) {
    throw new Error('No staff form instance');
  }
  await staffFormInstance.onSubmit();

  const staffData = staffFormInstance.getStaffData();

  if (props.actionType === ActionType.ADD) {
    return createStaffMutation.mutate(staffData);
  }
  if (props.actionType === ActionType.EDIT) {
    try {
      await updateStaffData(staffData);
    } catch (err) {
      handleError(i18n.global.t('Error updating staff data'));
      throw new Error('Error updating staff data');
    }

    if (newPrivileges) {
      try {
        await updateStaffPrivileges(newPrivileges);
      } catch (err) {
        handleError(i18n.global.t('Error updating staff privileges'));
        throw new Error('Error updating staff privileges');
      }
    }
  }
}

const createStaffMutation = useMutation({
  mutationFn: (staffData: StaffData) =>
    staffService.createStaff(staffData),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Member created'), onSuccessCallback);
  },
});
const editStaffMutation = useMutation({
  mutationFn: (staffData: StaffData) =>
    staffService.editStaff(staffData),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Member updated'), onSuccessCallback);
  },
});
const updatePrivilegesMutation = useMutation({
  mutationFn: (data: {
    staffId: number;
    privileges: IDashboardPrivileges;
  }) => staffService.updatePrivileges(data.staffId, data.privileges),
  onSuccess: () => {
    handleSuccess(
      i18n.global.t('Privileges updated'),
      onSuccessCallback,
    );
  },
});
</script>

<style lang="scss" scoped>
.staff-popup {
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  .v-tabs-window {
    padding: 12px 0;
    max-height: 400px;
    overflow-y: auto;
    scrollbar-gutter: stable;
  }
}
</style>
