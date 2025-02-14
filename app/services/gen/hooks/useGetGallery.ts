import client from '@kubb/plugin-client/clients/axios'
import type { GetGalleryQueryResponse, GetGalleryPathParams } from '../models/GetGallery.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getGallery } from '../client/detailsService/getGallery.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getGalleryQueryKey = ({ id }: { id: GetGalleryPathParams['id'] }) => [{ url: '/api/gallery/:id', params: { id: id } }] as const

export type GetGalleryQueryKey = ReturnType<typeof getGalleryQueryKey>

export function getGalleryQueryOptions({ id }: { id: GetGalleryPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getGalleryQueryKey({ id })
  return queryOptions<GetGalleryQueryResponse, ResponseErrorConfig<Error>, GetGalleryQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getGallery({ id }, config)
    },
  })
}

/**
 * {@link /api/gallery/:id}
 */
export function useGetGallery<TData = GetGalleryQueryResponse, TQueryData = GetGalleryQueryResponse, TQueryKey extends QueryKey = GetGalleryQueryKey>(
  { id }: { id: GetGalleryPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetGalleryQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getGalleryQueryKey({ id })

  const query = useQuery({
    ...(getGalleryQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}