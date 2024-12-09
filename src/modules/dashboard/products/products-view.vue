<template>
  <div>Products</div>
  <ProductsDataTable
    :current-page="paginationData.page"
    :is-loading="getProductsQuery.isLoading.value"
    :page-limit="paginationData.limit"
    :products="productsStore.products"
    :total-records="paginationData.totalRecords"
    @update:options="updateOptions"
  />
  <Loader :is-loading="getProductsQuery.isLoading.value" />
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { PaginationData } from '@/global/models/pagination-data';
import { productsQueryKeys } from './utils/products.query-keys';
import { useProductsStore } from './products.store';
import { productsService } from './service/products.service';
import ProductsDataTable from './components/products-data-table.vue';
import Loader from '../components/loader.vue';

const productsStore = useProductsStore();
const paginationData = ref(new PaginationData());

const getProductsQuery = useQuery({
  queryKey: [productsQueryKeys.GET_PRODUCTS],
  queryFn: async () => {
    const res = await productsService.getProducts(
      paginationData.value,
    );
    productsStore.setProducts(res);
    return res;
  },
});

function updateOptions(options: {
  page: number;
  itemsPerPage: number;
}): void {
  paginationData.value
    .setPage(options.page)
    .setLimit(options.itemsPerPage);
  getProductsQuery.refetch();
}
</script>
