<template>
  <v-data-table
    :items="products"
    :items-length="totalRecords"
    :items-per-page="pageLimit"
    :loading="isLoading"
    :page="currentPage"
    :search="searchValue"
    @update:options="updateOptions"
    @update:page="updateCurrentPage"
  >
    <template #item.actions="{ item }">
      <TableActionButtons
        :item-id="item.id"
        @delete="onDeleteClick"
        @edit="onEditClick"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Product } from '../models/product';
import TableActionButtons from '../../components/table-action-buttons.vue';

type EmitType = {
  (
    e: 'update:options',
    options: {
      page: number;
      itemsPerPage: number;
    },
  ): void;
};
const emit = defineEmits<EmitType>();

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageLimit: {
    type: Number,
    default: 10,
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
  searchValue: {
    type: String,
    default: '',
  },
});

function updateCurrentPage(page: number): void {
  console.log('updateCurrentPage', page);
}
function updateOptions(options: {
  page: number;
  itemsPerPage: number;
}): void {
  emit('update:options', options);
}

function onEditClick(): void {
  // ...
}
function onDeleteClick(): void {
  // ...
}
</script>
