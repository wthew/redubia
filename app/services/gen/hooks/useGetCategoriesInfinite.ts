import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesQueryResponse, GetCategoriesQueryParams, GetCategories422 } from '../models/GetCategories.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getCategories } from '../client/categoriesService/getCategories.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getCategoriesInfiniteQueryKey = (params?: GetCategoriesQueryParams) => [{ url: '/api/categories' }, ...(params ? [params] : [])] as const

export type GetCategoriesInfiniteQueryKey = ReturnType<typeof getCategoriesInfiniteQueryKey>

export function getCategoriesInfiniteQueryOptions(
  { params }: { params?: GetCategoriesQueryParams },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCategoriesInfiniteQueryKey(params)
  return infiniteQueryOptions<GetCategoriesQueryResponse, ResponseErrorConfig<GetCategories422>, GetCategoriesQueryResponse, typeof queryKey, number>({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['cursor'] = pageParam as unknown as GetCategoriesQueryParams['cursor']
      }
      return getCategories({ params }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/categories}
 */
export function useGetCategoriesInfinite<
  TData = InfiniteData<GetCategoriesQueryResponse>,
  TQueryData = GetCategoriesQueryResponse,
  TQueryKey extends QueryKey = GetCategoriesInfiniteQueryKey,
>(
  { params }: { params?: GetCategoriesQueryParams },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<GetCategoriesQueryResponse, ResponseErrorConfig<GetCategories422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCategoriesInfiniteQueryKey(params)

  const query = useInfiniteQuery({
    ...(getCategoriesInfiniteQueryOptions({ params }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<GetCategories422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}