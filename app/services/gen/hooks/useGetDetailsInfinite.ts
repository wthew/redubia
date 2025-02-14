import client from '@kubb/plugin-client/clients/axios'
import type { GetDetailsQueryResponse, GetDetailsPathParams } from '../models/GetDetails.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getDetails } from '../client/detailsService/getDetails.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getDetailsInfiniteQueryKey = ({ id }: { id: GetDetailsPathParams['id'] }) => [{ url: '/api/details/:id', params: { id: id } }] as const

export type GetDetailsInfiniteQueryKey = ReturnType<typeof getDetailsInfiniteQueryKey>

export function getDetailsInfiniteQueryOptions({ id }: { id: GetDetailsPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getDetailsInfiniteQueryKey({ id })
  return infiniteQueryOptions<GetDetailsQueryResponse, ResponseErrorConfig<Error>, GetDetailsQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getDetails({ id }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/details/:id}
 */
export function useGetDetailsInfinite<
  TData = InfiniteData<GetDetailsQueryResponse>,
  TQueryData = GetDetailsQueryResponse,
  TQueryKey extends QueryKey = GetDetailsInfiniteQueryKey,
>(
  { id }: { id: GetDetailsPathParams['id'] },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<GetDetailsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getDetailsInfiniteQueryKey({ id })

  const query = useInfiniteQuery({
    ...(getDetailsInfiniteQueryOptions({ id }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}