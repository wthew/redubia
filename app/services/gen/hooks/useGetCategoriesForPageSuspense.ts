import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesForPageQueryResponse, GetCategoriesForPagePathParams } from '../models/GetCategoriesForPage.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getCategoriesForPage } from '../client/detailsService/getCategoriesForPage.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getCategoriesForPageSuspenseQueryKey = ({ id }: { id: GetCategoriesForPagePathParams['id'] }) =>
  [{ url: '/api/details/:id/categories', params: { id: id } }] as const

export type GetCategoriesForPageSuspenseQueryKey = ReturnType<typeof getCategoriesForPageSuspenseQueryKey>

export function getCategoriesForPageSuspenseQueryOptions(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCategoriesForPageSuspenseQueryKey({ id })
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
export function useGetCategoriesForPageSuspense<
  TData = GetCategoriesForPageQueryResponse,
  TQueryData = GetCategoriesForPageQueryResponse,
  TQueryKey extends QueryKey = GetCategoriesForPageSuspenseQueryKey,
>(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetCategoriesForPageQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCategoriesForPageSuspenseQueryKey({ id })

  const query = useSuspenseQuery({
    ...(getCategoriesForPageSuspenseQueryOptions({ id }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}