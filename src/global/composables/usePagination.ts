import { QueryObserverResult } from '@tanstack/vue-query';
import { IPageOptions } from '../interfaces/page-options';
import { PaginationData } from '../models/pagination-data';
import { useRoute, useRouter } from 'vue-router';
import { useUrlSearchParams } from '@vueuse/core';

export const getDataFromQuery = <T extends PaginationData>(
  filtersData: Ref<T>,
) => {
  const searchParams = useUrlSearchParams();
  const page = searchParams.page;
  const limit = searchParams.limit;

  if (page && !isNaN(Number(page))) {
    filtersData.value.page = Number(page);
  }
  if (limit && !isNaN(Number(limit))) {
    filtersData.value.limit = Number(limit);
  }
  filtersData.value.offset =
    (filtersData.value.page - 1) * filtersData.value.limit;
};

export const usePagination = <T extends PaginationData, R = void>(
  queryKeys: string[],
  data: Ref<T>,
  handler: () => Promise<QueryObserverResult<R, Error>>,
) => {
  const route = useRoute();
  const router = useRouter();

  const prevState = ref<IPageOptions | null>(null);

  function onPageChange(newPageState: IPageOptions): void {
    // if (prevState.value) {
    //   onPageStateLimitChange(newPageState, prevState.value);
    // }

    router.push({
      query: {
        ...route.query,
        page: String(newPageState.page),
        limit: String(newPageState.itemsPerPage),
      },
    });
    prevState.value = newPageState;
  }

  watch(
    () => route.query,
    async () => {
      console.log('route query change data - ', data.value);
      getDataFromQuery(data);
      console.log('new data - ', data.value);
      await handler();
    },
    { deep: true, immediate: true },
  );

  return {
    onPageChange,
  };
};
