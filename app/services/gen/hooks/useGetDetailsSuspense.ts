import client from '@kubb/plugin-client/clients/axios'
import type { GetDetailsQueryResponse, GetDetailsPathParams } from '../models/GetDetails.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getDetails } from '../client/detailsService/getDetails.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getDetailsSuspenseQueryKey = ({ id }: { id: GetDetailsPathParams['id'] }) => [{ url: '/api/details/:id', params: { id: id } }] as const

export type GetDetailsSuspenseQueryKey = ReturnType<typeof getDetailsSuspenseQueryKey>

export function getDetailsSuspenseQueryOptions({ id }: { id: GetDetailsPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getDetailsSuspenseQueryKey({ id })
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
export function useGetDetailsSuspense<
  TData = GetDetailsQueryResponse,
  TQueryData = GetDetailsQueryResponse,
  TQueryKey extends QueryKey = GetDetailsSuspenseQueryKey,
>(
  { id }: { id: GetDetailsPathParams['id'] },
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetDetailsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getDetailsSuspenseQueryKey({ id })

  const query = useSuspenseQuery({
    ...(getDetailsSuspenseQueryOptions({ id }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}