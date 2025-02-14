import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesQueryResponse, GetCategoriesQueryParams, GetCategories422 } from '../models/GetCategories.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCategories } from '../client/categoriesService/getCategories.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCategoriesQueryKey = (params?: GetCategoriesQueryParams) => [{ url: '/api/categories' }, ...(params ? [params] : [])] as const

export type GetCategoriesQueryKey = ReturnType<typeof getCategoriesQueryKey>

export function getCategoriesQueryOptions({ params }: { params?: GetCategoriesQueryParams }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCategoriesQueryKey(params)
  return queryOptions<GetCategoriesQueryResponse, ResponseErrorConfig<GetCategories422>, GetCategoriesQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCategories({ params }, config)
    },
  })
}

/**
 * {@link /api/categories}
 */
export function useGetCategories<
  TData = GetCategoriesQueryResponse,
  TQueryData = GetCategoriesQueryResponse,
  TQueryKey extends QueryKey = GetCategoriesQueryKey,
>(
  { params }: { params?: GetCategoriesQueryParams },
  options: {
    query?: Partial<QueryObserverOptions<GetCategoriesQueryResponse, ResponseErrorConfig<GetCategories422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCategoriesQueryKey(params)

  const query = useQuery({
    ...(getCategoriesQueryOptions({ params }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetCategories422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}