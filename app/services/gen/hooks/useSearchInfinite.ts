import client from '@kubb/plugin-client/clients/axios'
import type { SearchQueryResponse, SearchQueryParams, Search422 } from '../models/Search.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { search } from '../client/searchService/search.ts'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const searchInfiniteQueryKey = (params?: SearchQueryParams) => [{ url: '/api/search' }, ...(params ? [params] : [])] as const

export type SearchInfiniteQueryKey = ReturnType<typeof searchInfiniteQueryKey>

export function searchInfiniteQueryOptions({ params }: { params?: SearchQueryParams }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = searchInfiniteQueryKey(params)
  return infiniteQueryOptions<SearchQueryResponse, ResponseErrorConfig<Search422>, SearchQueryResponse, typeof queryKey, number>({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['cursor'] = pageParam as unknown as SearchQueryParams['cursor']
      }
      return search({ params }, config)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage['next_cursor'],
    getPreviousPageParam: (firstPage) => firstPage['next_cursor'],
  })
}

/**
 * {@link /api/search}
 */
export function useSearchInfinite<
  TData = InfiniteData<SearchQueryResponse>,
  TQueryData = SearchQueryResponse,
  TQueryKey extends QueryKey = SearchInfiniteQueryKey,
>(
  { params }: { params?: SearchQueryParams },
  options: {
    query?: Partial<InfiniteQueryObserverOptions<SearchQueryResponse, ResponseErrorConfig<Search422>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? searchInfiniteQueryKey(params)

  const query = useInfiniteQuery({
    ...(searchInfiniteQueryOptions({ params }, config) as unknown as InfiniteQueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<InfiniteQueryObserverOptions, 'queryKey'>),
  }) as UseInfiniteQueryResult<TData, ResponseErrorConfig<Search422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}