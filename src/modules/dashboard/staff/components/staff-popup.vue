<template>
  <div class="staff-popup">
    <TabsMenu
      :items="tabItems"
      :selected-tab="currentTab"
      tabs-align="center"
      @change="currentTab = $event"
    />

    <v-tabs-window v-model="currentTab">
      <v-tabs-window-item :value="tabItems[0].value">
        <StaffForm
          :action-type="actionType"
          :staff-id="staffId"
          @cancel="emit('close')"
          @confirm="onConfirm"
        />
      </v-tabs-window-item>
      <v-tabs-window-item :value="tabItems[1].value">
        <StaffPrivileges :staff-id="staffId" />
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
import { TabsMenuItem } from '../../types/tabs-menu-item';
import StaffPrivileges from './staff-privileges.vue';
import StaffForm from './staff-form.vue';
import TabsMenu from '../../components/tabs-menu.vue';
import i18n from '@/plugins/i18n';

type StaffPopupEmits = {
  (e: 'close'): void;
  (e: 'refetch'): void;
};

const tabItems: TabsMenuItem[] = [
  {
    label: i18n.global.t('General'),
    value: 'general',
  },
  {
    label: i18n.global.t('Privileges'),
    value: 'privileges',
  },
];

const currentTab = ref(tabItems[0]);

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
function handleSuccess(messageText: TranslateResult): void {
  const message = Message.getMessage(MessageType.SUCCESS);
  message.content = messageText;
  globalStore.addMessage(message);
  emit('refetch');
  emit('close');
}

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

async function onConfirm(staffData: StaffData): Promise<void> {
  if (props.actionType === ActionType.ADD) {
    return createStaffMutation.mutate(staffData);
  }
  if (props.actionType === ActionType.EDIT) {
    return editStaffMutation.mutate(staffData);
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
