/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/axios'
import type { GetGalleryQueryResponse, GetGalleryPathParams } from '../../models/GetGallery.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetGalleryUrl({ id }: { id: GetGalleryPathParams['id'] }) {
  return `http://localhost:3000/api/gallery/${id}` as const
}

/**
 * {@link /api/gallery/:id}
 */
export async function getGallery({ id }: { id: GetGalleryPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetGalleryQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetGalleryUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}