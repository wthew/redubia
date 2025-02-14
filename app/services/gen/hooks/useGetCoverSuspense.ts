import client from '@kubb/plugin-client/clients/axios'
import type { GetCoverQueryResponse, GetCoverPathParams } from '../models/GetCover.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getCover } from '../client/detailsService/getCover.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getCoverSuspenseQueryKey = ({ id }: { id: GetCoverPathParams['id'] }) => [{ url: '/api/cover/:id', params: { id: id } }] as const

export type GetCoverSuspenseQueryKey = ReturnType<typeof getCoverSuspenseQueryKey>

export function getCoverSuspenseQueryOptions({ id }: { id: GetCoverPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCoverSuspenseQueryKey({ id })
  return queryOptions<GetCoverQueryResponse, ResponseErrorConfig<Error>, GetCoverQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCover({ id }, config)
    },
  })
}

/**
 * {@link /api/cover/:id}
 */
export function useGetCoverSuspense<TData = GetCoverQueryResponse, TQueryData = GetCoverQueryResponse, TQueryKey extends QueryKey = GetCoverSuspenseQueryKey>(
  { id }: { id: GetCoverPathParams['id'] },
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetCoverQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCoverSuspenseQueryKey({ id })

  const query = useSuspenseQuery({
    ...(getCoverSuspenseQueryOptions({ id }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}