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
          :action-type="actionType"
          :staff-id="staffId"
          @cancel="emit('close')"
          @confirm="onConfirm"
        />
      </v-tabs-window-item>
      <v-tabs-window-item
        v-if="actionType === ActionType.EDIT"
        :value="tabItemsComputed[1].value"
      >
        <StaffPrivileges ref="staffPrivileges" :staff-id="staffId" />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { staffService } from '../service/staff.service';
import { StaffData } from '../models/staff-data';
import { ActionType } from '../../enums/action-type.enum';
import { useMutation } from '@tanstack/vue-query';
import { useGlobalStore } from '@/global/store/global.store';
import { TranslateResult } from 'vue-i18n';
import { Message } from '@/global/models/message';
import { MessageType } from '@/global/enums/message-type.enum';
import StaffPrivileges from './staff-privileges.vue';
import StaffForm from './staff-form.vue';
import TabsMenu from '../../components/tabs-menu.vue';
import i18n from '@/plugins/i18n';
import { staffPopupTabItems } from '../utils/staff-popup-tab-items';
import { IDashboardPrivileges } from '../../interfaces/IDashoardPrivileges';

type StaffPopupEmits = {
  (e: 'close'): void;
  (e: 'refetch'): void;
};

const emit = defineEmits<StaffPopupEmits>();

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

const globalStore = useGlobalStore();
const staffPrivileges = ref<InstanceType<typeof StaffPrivileges>>();

function handleSuccess(messageText: TranslateResult): void {
  const message = Message.getMessage(MessageType.SUCCESS);
  message.content = messageText;
  globalStore.addMessage(message);
  emit('refetch');
  emit('close');
}

function handleError(messageText: TranslateResult): void {
  const message = Message.getMessage(MessageType.ERROR);
  message.content = messageText;
  globalStore.addMessage(message);
}

const tabItemsComputed = computed(() => {
  if (props.actionType === ActionType.ADD) {
    return staffPopupTabItems.filter(
      (el) => el.value !== 'privileges',
    );
  } else return staffPopupTabItems;
});

const currentTab = ref(tabItemsComputed.value[0]);

const createStaffMutation = useMutation({
  mutationFn: (staffData: StaffData) =>
    staffService.createStaff(staffData),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Member created'));
  },
});
const editStaffMutation = useMutation({
  mutationFn: (staffData: StaffData) =>
    staffService.editStaff(staffData),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Member updated'));
  },
});
const updatePrivileges = useMutation({
  mutationFn: (data: {
    staffId: number;
    privileges: IDashboardPrivileges;
  }) => staffService.updatePrivileges(data.staffId, data.privileges),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Privileges updated'));
  },
});

async function updateStaffData(staffData: StaffData): Promise<void> {
  return new Promise((resolve) => {
    resolve(editStaffMutation.mutate(staffData));
  });
}

async function updateStaffPrivileges(
  privileges: IDashboardPrivileges,
): Promise<void> {
  return new Promise((resolve) => {
    resolve(
      updatePrivileges.mutate({
        staffId: props.staffId,
        privileges,
      }),
    );
  });
}

async function handleStaffDataAndPrivilegesUpdate(
  staffData: StaffData,
  newPrivileges: IDashboardPrivileges,
): Promise<void> {
  try {
    await updateStaffData(staffData);
    await updateStaffPrivileges(newPrivileges);
  } catch (err) {
    handleError(
      i18n.global.t('Error updating staff data and privileges'),
    );
    throw new Error('Error updating staff data and privileges');
  }
}

async function onConfirm(staffData: StaffData): Promise<void> {
  const isStaffFormValid = true;
  const newPrivileges = staffPrivileges.value?.getNewPrivileges();

  if (!isStaffFormValid || !newPrivileges) {
    throw new Error('Invalid form data');
  }

  if (props.actionType === ActionType.ADD) {
    return createStaffMutation.mutate(staffData);
  }

  if (props.actionType === ActionType.EDIT && newPrivileges) {
    return handleStaffDataAndPrivilegesUpdate(
      staffData,
      newPrivileges,
    );
  }
}
</script>

<style lang="scss" scoped>
.staff-popup {
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  .v-tabs-window {
    padding: 12px 0;
  }
}
</style>
