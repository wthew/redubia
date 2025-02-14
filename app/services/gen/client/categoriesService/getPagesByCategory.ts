/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type {
  GetPagesByCategoryQueryResponse,
  GetPagesByCategoryPathParams,
  GetPagesByCategoryQueryParams,
  GetPagesByCategory422,
} from '../../models/GetPagesByCategory.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetPagesByCategoryUrl({ id }: { id: GetPagesByCategoryPathParams['id'] }) {
  return `http://localhost:3000/api/categories/${id}` as const
}

/**
 * {@link /api/categories/:id}
 */
export async function getPagesByCategory(
  { id, params }: { id: GetPagesByCategoryPathParams['id']; params?: GetPagesByCategoryQueryParams },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetPagesByCategoryQueryResponse, ResponseErrorConfig<GetPagesByCategory422>, unknown>({
    method: 'GET',
    url: getGetPagesByCategoryUrl({ id }).toString(),
    params,
    ...requestConfig,
  })
  return res.data
}