import client from '@kubb/plugin-client/clients/axios'
import type { GetDetailsQueryResponse, GetDetailsPathParams } from '../models/GetDetails.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getDetails } from '../client/detailsService/getDetails.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getDetailsQueryKey = ({ id }: { id: GetDetailsPathParams['id'] }) => [{ url: '/api/details/:id', params: { id: id } }] as const

export type GetDetailsQueryKey = ReturnType<typeof getDetailsQueryKey>

export function getDetailsQueryOptions({ id }: { id: GetDetailsPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getDetailsQueryKey({ id })
  return queryOptions<GetDetailsQueryResponse, ResponseErrorConfig<Error>, GetDetailsQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getDetails({ id }, config)
    },
  })
}

/**
 * {@link /api/details/:id}
 */
export function useGetDetails<TData = GetDetailsQueryResponse, TQueryData = GetDetailsQueryResponse, TQueryKey extends QueryKey = GetDetailsQueryKey>(
  { id }: { id: GetDetailsPathParams['id'] },
  options: {
    query?: Partial<QueryObserverOptions<GetDetailsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getDetailsQueryKey({ id })

  const query = useQuery({
    ...(getDetailsQueryOptions({ id }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}