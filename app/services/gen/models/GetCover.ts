import type { Cover } from './Cover.ts'
import type { Error } from './Error.ts'

export type GetCoverPathParams = {
  /**
   * @minLength 0
   * @type integer
   */
  id: number
}

/**
 * @description OK
 */
export type GetCover200 = Cover

/**
 * @description Default error response
 */
export type GetCoverError = Error

export type GetCoverQueryResponse = GetCover200

export type GetCoverQuery = {
  Response: GetCover200
  PathParams: GetCoverPathParams
  Errors: any
}