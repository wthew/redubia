import client from '@kubb/plugin-client/clients/axios'
import type { SearchQueryResponse, SearchQueryParams, Search422 } from '../models/Search.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { search } from '../client/searchService/search.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const searchSuspenseQueryKey = (params?: SearchQueryParams) => [{ url: '/api/search' }, ...(params ? [params] : [])] as const

export type SearchSuspenseQueryKey = ReturnType<typeof searchSuspenseQueryKey>

export function searchSuspenseQueryOptions({ params }: { params?: SearchQueryParams }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = searchSuspenseQueryKey(params)
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
export function useSearchSuspense<TData = SearchQueryResponse, TQueryData = SearchQueryResponse, TQueryKey extends QueryKey = SearchSuspenseQueryKey>(
  { params }: { params?: SearchQueryParams },
  options: {
    query?: Partial<UseSuspenseQueryOptions<SearchQueryResponse, ResponseErrorConfig<Search422>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(searchSuspenseQueryOptions({ params }, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Search422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}