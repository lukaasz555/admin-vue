<template>
  <form @submit.prevent="onSubmit">
    <Input
      v-model="name"
      :error-message="errors.name"
      :label="$t('Name')"
    />
    <Input
      v-model="lastname"
      :error-message="errors.lastname"
      :label="$t('Last name')"
    />
    <Input
      v-model="email"
      :error-message="errors.email"
      :label="$t('Email')"
    />
    <Input
      v-model="phoneNumber"
      :error-message="errors.phoneNumber"
      :label="$t('Phone')"
    />
    <RoleSelect
      v-if="canEditStaffRole"
      :current-role="role"
      @update="role = $event"
    />
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import Input from '@/global/components/input.vue';
import i18n from '@/plugins/i18n';
import { ActionType } from '../../enums/action-type.enum';
import { useStaffStore } from '../staff.store';
import { Roles } from '@/global/enums/roles.enum';
import RoleSelect from './role-select.vue';
import { StaffData } from '../models/staff-data';

const props = defineProps({
  staffId: {
    type: Number,
    required: true,
  },
  actionType: {
    type: String as PropType<ActionType>,
    default: ActionType.ADD,
  },
  canEditStaffRole: {
    type: Boolean,
    default: false,
  },
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, i18n.global.t('Required field')).max(50),
    lastname: z
      .string()
      .min(1, i18n.global.t('Required field'))
      .max(50),
    email: z
      .string()
      .min(1, i18n.global.t('Required field'))
      .email(i18n.global.t('Invalid email')),
    phoneNumber: z
      .string()
      .min(1, i18n.global.t('Required field'))
      .length(9, i18n.global.t('Phone number must be 9 digits'))
      .regex(/^\d+$/, i18n.global.t('Only digits are allowed')),
  }),
);

const staffStore = useStaffStore();
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: getFormInitialValues(),
});

function getFormInitialValues() {
  if (props.actionType === ActionType.EDIT) {
    const member = staffStore.getMember(props.staffId);
    if (member) {
      return {
        name: member.name,
        lastname: member.lastname,
        email: member.email,
        phoneNumber: member.phone,
        role: member.role || Roles.ASSISTANT,
      };
    }
  }
  return {
    name: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    role: Roles.ASSISTANT,
  };
}

const staffData = ref(new StaffData());
const { value: name } = useField<string>('name');
const { value: lastname } = useField<string>('lastname');
const { value: email } = useField<string>('email');
const { value: phoneNumber } = useField<string>('phoneNumber');
const { value: role } = useField<Roles>('role');

role.value = getFormInitialValues().role;

const onSubmit = handleSubmit(async (values) => {
  staffData.value.id =
    props.actionType === ActionType.EDIT
      ? props.staffId
      : staffData.value.id;
  staffData.value.name = values.name;
  staffData.value.lastname = values.lastname;
  staffData.value.email = values.email;
  staffData.value.phoneNumber = values.phoneNumber;
  staffData.value.role = role.value;
});

function getStaffData(): StaffData {
  return staffData.value;
}

defineExpose({ getStaffData, resetForm, onSubmit });
</script>
