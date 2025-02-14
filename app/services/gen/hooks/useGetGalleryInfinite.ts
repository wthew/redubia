import client from '@kubb/plugin-client/clients/axios'
import type { GetGalleryQueryResponse, GetGalleryPathParams } from '../models/GetGallery.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { getGallery } from '../client/detailsService/getGallery.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const getGalleryInfiniteQueryKey = ({ id }: { id: GetGalleryPathParams['id'] }) => [{ url: '/api/gallery/:id', params: { id: id } }] as const

export type GetGalleryInfiniteQueryKey = ReturnType<typeof getGalleryInfiniteQueryKey>

export function getGalleryInfiniteQueryOptions({ id }: { id: GetGalleryPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getGalleryInfiniteQueryKey({ id })
  return infiniteQueryOptions<GetGalleryQueryResponse, ResponseErrorConfig<Error>, GetGalleryQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getGallery({ id }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/gallery/:id}
 */
export function useGetGalleryInfinite<
  TData = InfiniteData<GetGalleryQueryResponse>,
  TQueryData = GetGalleryQueryResponse,
  TQueryKey extends QueryKey = GetGalleryInfiniteQueryKey,
>(
  { id }: { id: GetGalleryPathParams['id'] },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<GetGalleryQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getGalleryInfiniteQueryKey({ id })

  const query = useInfiniteQuery({
    ...(getGalleryInfiniteQueryOptions({ id }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}