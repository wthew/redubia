/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type { GetCategoriesForPageQueryResponse, GetCategoriesForPagePathParams } from '../../models/GetCategoriesForPage.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetCategoriesForPageUrl({ id }: { id: GetCategoriesForPagePathParams['id'] }) {
  return `http://localhost:3000/api/details/${id}/categories` as const
}

/**
 * {@link /api/details/:id/categories}
 */
export async function getCategoriesForPage(
  { id }: { id: GetCategoriesForPagePathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCategoriesForPageQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCategoriesForPageUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}