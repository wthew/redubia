/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type { GetDetailsQueryResponse, GetDetailsPathParams } from '../../models/GetDetails.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetDetailsUrl({ id }: { id: GetDetailsPathParams['id'] }) {
  return `http://localhost:3000/api/details/${id}` as const
}

/**
 * {@link /api/details/:id}
 */
export async function getDetails({ id }: { id: GetDetailsPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetDetailsQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetDetailsUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}