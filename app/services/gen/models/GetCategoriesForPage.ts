import type { Category } from './Category.ts'
import type { Error } from './Error.ts'

export type GetCategoriesForPagePathParams = {
  /**
   * @minLength 0
   * @type integer
   */
  id: number
}

/**
 * @description OK
 */
export type GetCategoriesForPage200 = Category[]

/**
 * @description Default error response
 */
export type GetCategoriesForPageError = Error

export type GetCategoriesForPageQueryResponse = GetCategoriesForPage200

export type GetCategoriesForPageQuery = {
  Response: GetCategoriesForPage200
  PathParams: GetCategoriesForPagePathParams
  Errors: any
}