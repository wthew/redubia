/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesQueryResponse, GetCategoriesQueryParams, GetCategories422 } from '../../models/GetCategories.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetCategoriesUrl() {
  return `http://localhost:3000/api/categories` as const
}

/**
 * {@link /api/categories}
 */
export async function getCategories({ params }: { params?: GetCategoriesQueryParams }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCategoriesQueryResponse, ResponseErrorConfig<GetCategories422>, unknown>({
    method: 'GET',
    url: getGetCategoriesUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}