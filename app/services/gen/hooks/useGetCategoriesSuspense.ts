import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesQueryResponse, GetCategoriesQueryParams, GetCategories422 } from '../models/GetCategories.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getCategories } from '../client/categoriesService/getCategories.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getCategoriesSuspenseQueryKey = (params?: GetCategoriesQueryParams) => [{ url: '/api/categories' }, ...(params ? [params] : [])] as const

export type GetCategoriesSuspenseQueryKey = ReturnType<typeof getCategoriesSuspenseQueryKey>

export function getCategoriesSuspenseQueryOptions(
  { params }: { params?: GetCategoriesQueryParams },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCategoriesSuspenseQueryKey(params)
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
export function useGetCategoriesSuspense<
  TData = GetCategoriesQueryResponse,
  TQueryData = GetCategoriesQueryResponse,
  TQueryKey extends QueryKey = GetCategoriesSuspenseQueryKey,
>(
  { params }: { params?: GetCategoriesQueryParams },
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetCategoriesQueryResponse, ResponseErrorConfig<GetCategories422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCategoriesSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getCategoriesSuspenseQueryOptions({ params }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetCategories422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}