import client from '@kubb/plugin-client/clients/axios'
import type { GetCoverQueryResponse, GetCoverPathParams } from '../models/GetCover.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getCover } from '../client/detailsService/getCover.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getCoverInfiniteQueryKey = ({ id }: { id: GetCoverPathParams['id'] }) => [{ url: '/api/cover/:id', params: { id: id } }] as const

export type GetCoverInfiniteQueryKey = ReturnType<typeof getCoverInfiniteQueryKey>

export function getCoverInfiniteQueryOptions({ id }: { id: GetCoverPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCoverInfiniteQueryKey({ id })
  return infiniteQueryOptions<GetCoverQueryResponse, ResponseErrorConfig<Error>, GetCoverQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCover({ id }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/cover/:id}
 */
export function useGetCoverInfinite<
  TData = InfiniteData<GetCoverQueryResponse>,
  TQueryData = GetCoverQueryResponse,
  TQueryKey extends QueryKey = GetCoverInfiniteQueryKey,
>(
  { id }: { id: GetCoverPathParams['id'] },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<GetCoverQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCoverInfiniteQueryKey({ id })

  const query = useInfiniteQuery({
    ...(getCoverInfiniteQueryOptions({ id }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}