import client from '@kubb/plugin-client/clients/axios'
import type {
  GetPagesByCategoryQueryResponse,
  GetPagesByCategoryPathParams,
  GetPagesByCategoryQueryParams,
  GetPagesByCategory422,
} from '../models/GetPagesByCategory.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getPagesByCategory } from '../client/categoriesService/getPagesByCategory.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getPagesByCategoryQueryKey = ({ id }: { id: GetPagesByCategoryPathParams['id'] }, params?: GetPagesByCategoryQueryParams) =>
  [{ url: '/api/categories/:id', params: { id: id } }, ...(params ? [params] : [])] as const

export type GetPagesByCategoryQueryKey = ReturnType<typeof getPagesByCategoryQueryKey>

export function getPagesByCategoryQueryOptions(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getPagesByCategoryQueryKey({ id }, params)
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
export function useGetPagesByCategory<
  TData = GetPagesByCategoryQueryResponse,
  TQueryData = GetPagesByCategoryQueryResponse,
  TQueryKey extends QueryKey = GetPagesByCategoryQueryKey,
>(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  options: {
    query?: Partial<QueryObserverOptions<GetPagesByCategoryQueryResponse, ResponseErrorConfig<GetPagesByCategory422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPagesByCategoryQueryKey({ id }, params)

  const query = useQuery({
    ...(getPagesByCategoryQueryOptions({ id, params }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetPagesByCategory422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}