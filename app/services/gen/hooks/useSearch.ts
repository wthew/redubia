import client from '@kubb/plugin-client/clients/axios'
import type { SearchQueryResponse, SearchQueryParams, Search422 } from '../models/Search.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { search } from '../client/searchService/search.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const searchQueryKey = (params?: SearchQueryParams) => [{ url: '/api/search' }, ...(params ? [params] : [])] as const

export type SearchQueryKey = ReturnType<typeof searchQueryKey>

export function searchQueryOptions({ params }: { params?: SearchQueryParams }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = searchQueryKey(params)
  return queryOptions<SearchQueryResponse, ResponseErrorConfig<Search422>, SearchQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return search({ params }, config)
    },
  })
}

/**
 * {@link /api/search}
 */
export function useSearch<TData = SearchQueryResponse, TQueryData = SearchQueryResponse, TQueryKey extends QueryKey = SearchQueryKey>(
  { params }: { params?: SearchQueryParams },
  options: {
    query?: Partial<QueryObserverOptions<SearchQueryResponse, ResponseErrorConfig<Search422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchQueryKey(params)

  const query = useQuery({
    ...(searchQueryOptions({ params }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Search422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}