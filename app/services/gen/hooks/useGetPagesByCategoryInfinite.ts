import client from '@kubb/plugin-client/clients/axios'
import type {
  GetPagesByCategoryQueryResponse,
  GetPagesByCategoryPathParams,
  GetPagesByCategoryQueryParams,
  GetPagesByCategory422,
} from '../models/GetPagesByCategory.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getPagesByCategory } from '../client/categoriesService/getPagesByCategory.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getPagesByCategoryInfiniteQueryKey = ({ id }: { id: GetPagesByCategoryPathParams['id'] }, params?: GetPagesByCategoryQueryParams) =>
  [{ url: '/api/categories/:id', params: { id: id } }, ...(params ? [params] : [])] as const

export type GetPagesByCategoryInfiniteQueryKey = ReturnType<typeof getPagesByCategoryInfiniteQueryKey>

export function getPagesByCategoryInfiniteQueryOptions(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getPagesByCategoryInfiniteQueryKey({ id }, params)
  return infiniteQueryOptions<
    GetPagesByCategoryQueryResponse,
    ResponseErrorConfig<GetPagesByCategory422>,
    GetPagesByCategoryQueryResponse,
    typeof queryKey,
    number
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['cursor'] = pageParam as unknown as GetPagesByCategoryQueryParams['cursor']
      }
      return getPagesByCategory({ id, params }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/categories/:id}
 */
export function useGetPagesByCategoryInfinite<
  TData = InfiniteData<GetPagesByCategoryQueryResponse>,
  TQueryData = GetPagesByCategoryQueryResponse,
  TQueryKey extends QueryKey = GetPagesByCategoryInfiniteQueryKey,
>(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<GetPagesByCategoryQueryResponse, ResponseErrorConfig<GetPagesByCategory422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPagesByCategoryInfiniteQueryKey({ id }, params)

  const query = useInfiniteQuery({
    ...(getPagesByCategoryInfiniteQueryOptions({ id, params }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<GetPagesByCategory422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}