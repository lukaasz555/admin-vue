<template>
  <form @submit.prevent="onSubmit">
    <Input
      v-model="name as string"
      :error-message="errors.name"
      :label="$t('Name')"
    />
    <Input
      v-model="lastname as string"
      :error-message="errors.lastname"
      :label="$t('Last name')"
    />
    <Input
      v-model="email as string"
      :error-message="errors.email"
      :label="$t('Email')"
    />
    <Input
      v-model="phoneNumber as string"
      :error-message="errors.phoneNumber"
      :label="$t('Phone')"
    />
    <Button :label="$t('Submit')" type="submit" />
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import Input from '@/global/components/input.vue';
import Button from '@/global/components/button.vue';
import i18n from '@/plugins/i18n';

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

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const { value: name } = useField('name');
const { value: lastname } = useField('lastname');
const { value: email } = useField('email');
const { value: phoneNumber } = useField('phoneNumber');

const onSubmit = handleSubmit(async (values) => {
  console.log('values', values);
});
</script>
