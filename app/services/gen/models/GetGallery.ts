import type { Error } from './Error.ts'
import type { Gallery } from './Gallery.ts'

export type GetGalleryPathParams = {
  /**
   * @minLength 0
   * @type integer
   */
  id: number
}

/**
 * @description OK
 */
export type GetGallery200 = Gallery[]

/**
 * @description Default error response
 */
export type GetGalleryError = Error

export type GetGalleryQueryResponse = GetGallery200

export type GetGalleryQuery = {
  Response: GetGallery200
  PathParams: GetGalleryPathParams
  Errors: any
}