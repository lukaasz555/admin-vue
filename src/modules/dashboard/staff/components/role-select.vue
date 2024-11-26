<template>
  <Select
    v-model="currentValue"
    :items="roleItems"
    :label="$t('Role')"
  />
</template>

<script setup lang="ts">
import Select from '@/global/components/select.vue';
import { Roles } from '@/global/enums/roles.enum';
import { SelectItemType } from '@/global/types/select-item.type';
import { PropType } from 'vue';

type EmitProps = {
  (e: 'update', item: Roles): void;
};

const emit = defineEmits<EmitProps>();

const props = defineProps({
  currentRole: {
    type: String as PropType<Roles>,
    required: true,
  },
});

const roleItems: SelectItemType[] = Object.values(Roles).map(
  (role) => ({
    displayText: role,
    value: role,
  }),
);

const currentValue = computed({
  get: () => {
    const role = roleItems.find(
      (item) => item.value === props.currentRole,
    );
    if (!role) throw new Error('No role found');
    return role;
  },
  set: (newRole) => emit('update', newRole.value as Roles),
});
</script>
