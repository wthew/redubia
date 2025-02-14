import client from '@kubb/plugin-client/clients/axios'
import type { GetGalleryQueryResponse, GetGalleryPathParams } from '../models/GetGallery.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getGallery } from '../client/detailsService/getGallery.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getGallerySuspenseQueryKey = ({ id }: { id: GetGalleryPathParams['id'] }) => [{ url: '/api/gallery/:id', params: { id: id } }] as const

export type GetGallerySuspenseQueryKey = ReturnType<typeof getGallerySuspenseQueryKey>

export function getGallerySuspenseQueryOptions({ id }: { id: GetGalleryPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getGallerySuspenseQueryKey({ id })
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
export function useGetGallerySuspense<
  TData = GetGalleryQueryResponse,
  TQueryData = GetGalleryQueryResponse,
  TQueryKey extends QueryKey = GetGallerySuspenseQueryKey,
>(
  { id }: { id: GetGalleryPathParams['id'] },
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetGalleryQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getGallerySuspenseQueryKey({ id })

  const query = useSuspenseQuery({
    ...(getGallerySuspenseQueryOptions({ id }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}