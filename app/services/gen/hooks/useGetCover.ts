import client from '@kubb/plugin-client/clients/axios'
import type { GetCoverQueryResponse, GetCoverPathParams } from '../models/GetCover.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCover } from '../client/detailsService/getCover.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCoverQueryKey = ({ id }: { id: GetCoverPathParams['id'] }) => [{ url: '/api/cover/:id', params: { id: id } }] as const

export type GetCoverQueryKey = ReturnType<typeof getCoverQueryKey>

export function getCoverQueryOptions({ id }: { id: GetCoverPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCoverQueryKey({ id })
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
export function useGetCover<TData = GetCoverQueryResponse, TQueryData = GetCoverQueryResponse, TQueryKey extends QueryKey = GetCoverQueryKey>(
  { id }: { id: GetCoverPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetCoverQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCoverQueryKey({ id })

  const query = useQuery({
    ...(getCoverQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}