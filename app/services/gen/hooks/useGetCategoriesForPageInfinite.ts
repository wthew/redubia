import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesForPageQueryResponse, GetCategoriesForPagePathParams } from '../models/GetCategoriesForPage.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getCategoriesForPage } from '../client/detailsService/getCategoriesForPage.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getCategoriesForPageInfiniteQueryKey = ({ id }: { id: GetCategoriesForPagePathParams['id'] }) =>
  [{ url: '/api/details/:id/categories', params: { id: id } }] as const

export type GetCategoriesForPageInfiniteQueryKey = ReturnType<typeof getCategoriesForPageInfiniteQueryKey>

export function getCategoriesForPageInfiniteQueryOptions(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCategoriesForPageInfiniteQueryKey({ id })
  return infiniteQueryOptions<GetCategoriesForPageQueryResponse, ResponseErrorConfig<Error>, GetCategoriesForPageQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCategoriesForPage({ id }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/details/:id/categories}
 */
export function useGetCategoriesForPageInfinite<
  TData = InfiniteData<GetCategoriesForPageQueryResponse>,
  TQueryData = GetCategoriesForPageQueryResponse,
  TQueryKey extends QueryKey = GetCategoriesForPageInfiniteQueryKey,
>(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<GetCategoriesForPageQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCategoriesForPageInfiniteQueryKey({ id })

  const query = useInfiniteQuery({
    ...(getCategoriesForPageInfiniteQueryOptions({ id }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}