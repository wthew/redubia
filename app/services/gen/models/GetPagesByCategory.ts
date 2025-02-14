import type { Error } from './Error.ts'
import type { Pages } from './Pages.ts'

export type GetPagesByCategoryPathParams = {
  /**
   * @type integer
   */
  id: number
}

export type GetPagesByCategoryQueryParams = {
  cursor?: unknown | undefined
}

/**
 * @description OK
 */
export type GetPagesByCategory200 = Pages

/**
 * @description Unprocessable Content
 */
export type GetPagesByCategory422 = Error

/**
 * @description Default error response
 */
export type GetPagesByCategoryError = Error

export type GetPagesByCategoryQueryResponse = GetPagesByCategory200

export type GetPagesByCategoryQuery = {
  Response: GetPagesByCategory200
  PathParams: GetPagesByCategoryPathParams
  QueryParams: GetPagesByCategoryQueryParams
  Errors: GetPagesByCategory422
}