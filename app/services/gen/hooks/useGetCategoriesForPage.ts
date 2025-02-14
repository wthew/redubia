import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesForPageQueryResponse, GetCategoriesForPagePathParams } from '../models/GetCategoriesForPage.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCategoriesForPage } from '../client/detailsService/getCategoriesForPage.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCategoriesForPageQueryKey = ({ id }: { id: GetCategoriesForPagePathParams['id'] }) =>
  [{ url: '/api/details/:id/categories', params: { id: id } }] as const

export type GetCategoriesForPageQueryKey = ReturnType<typeof getCategoriesForPageQueryKey>

export function getCategoriesForPageQueryOptions(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCategoriesForPageQueryKey({ id })
  return queryOptions<GetCategoriesForPageQueryResponse, ResponseErrorConfig<Error>, GetCategoriesForPageQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCategoriesForPage({ id }, config)
    },
  })
}

/**
 * {@link /api/details/:id/categories}
 */
export function useGetCategoriesForPage<
  TData = GetCategoriesForPageQueryResponse,
  TQueryData = GetCategoriesForPageQueryResponse,
  TQueryKey extends QueryKey = GetCategoriesForPageQueryKey,
>(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetCategoriesForPageQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCategoriesForPageQueryKey({ id })

  const query = useQuery({
    ...(getCategoriesForPageQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}