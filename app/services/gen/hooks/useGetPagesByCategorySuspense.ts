import client from '@kubb/plugin-client/clients/axios'
import type {
  GetPagesByCategoryQueryResponse,
  GetPagesByCategoryPathParams,
  GetPagesByCategoryQueryParams,
  GetPagesByCategory422,
} from '../models/GetPagesByCategory.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getPagesByCategory } from '../client/categoriesService/getPagesByCategory.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getPagesByCategorySuspenseQueryKey = ({ id }: { id: GetPagesByCategoryPathParams['id'] }, params?: GetPagesByCategoryQueryParams) =>
  [{ url: '/api/categories/:id', params: { id: id } }, ...(params ? [params] : [])] as const

export type GetPagesByCategorySuspenseQueryKey = ReturnType<typeof getPagesByCategorySuspenseQueryKey>

export function getPagesByCategorySuspenseQueryOptions(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getPagesByCategorySuspenseQueryKey({ id }, params)
  return queryOptions<GetPagesByCategoryQueryResponse, ResponseErrorConfig<GetPagesByCategory422>, GetPagesByCategoryQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getPagesByCategory({ id, params }, config)
    },
  })
}

/**
 * {@link /api/categories/:id}
 */
export function useGetPagesByCategorySuspense<
  TData = GetPagesByCategoryQueryResponse,
  TQueryData = GetPagesByCategoryQueryResponse,
  TQueryKey extends QueryKey = GetPagesByCategorySuspenseQueryKey,
>(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetPagesByCategoryQueryResponse, ResponseErrorConfig<GetPagesByCategory422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPagesByCategorySuspenseQueryKey({ id }, params)

  const query = useSuspenseQuery({
    ...(getPagesByCategorySuspenseQueryOptions({ id, params }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetPagesByCategory422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}