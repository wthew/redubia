/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type { SearchQueryResponse, SearchQueryParams, Search422 } from '../../models/Search.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getSearchUrl() {
  return `http://localhost:3000/api/search` as const
}

/**
 * {@link /api/search}
 */
export async function search({ params }: { params?: SearchQueryParams }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchQueryResponse, ResponseErrorConfig<Search422>, unknown>({
    method: 'GET',
    url: getSearchUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}