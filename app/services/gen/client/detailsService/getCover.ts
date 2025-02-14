/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type { GetCoverQueryResponse, GetCoverPathParams } from '../../models/GetCover.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetCoverUrl({ id }: { id: GetCoverPathParams['id'] }) {
  return `http://localhost:3000/api/cover/${id}` as const
}

/**
 * {@link /api/cover/:id}
 */
export async function getCover({ id }: { id: GetCoverPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCoverQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCoverUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}