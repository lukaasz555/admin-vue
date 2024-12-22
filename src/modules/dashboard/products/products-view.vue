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
import { IPageOptions } from '@/global/interfaces/page-options';
import { usePagination } from '@/global/composables/usePagination';
import { Product } from './models/product';
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

const { onPageChange } = usePagination<PaginationData, Product[]>(
  [productsQueryKeys.GET_PRODUCTS],
  paginationData,
  getProductsQuery.refetch,
);
function updateOptions(options: IPageOptions): void {
  onPageChange(options);
}
</script>
