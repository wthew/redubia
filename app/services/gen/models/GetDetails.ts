import type { Error } from './Error.ts'
import type { PageDetails } from './PageDetails.ts'

export type GetDetailsPathParams = {
  /**
   * @minLength 0
   * @type integer
   */
  id: number
}

/**
 * @description OK
 */
export type GetDetails200 = PageDetails

/**
 * @description Default error response
 */
export type GetDetailsError = Error

export type GetDetailsQueryResponse = GetDetails200

export type GetDetailsQuery = {
  Response: GetDetails200
  PathParams: GetDetailsPathParams
  Errors: any
}