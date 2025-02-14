import type { Categories } from './Categories.ts'
import type { Error } from './Error.ts'

export type GetCategoriesQueryParams = {
  cursor?: unknown | undefined
}

/**
 * @description OK
 */
export type GetCategories200 = Categories

/**
 * @description Unprocessable Content
 */
export type GetCategories422 = Error

/**
 * @description Default error response
 */
export type GetCategoriesError = Error

export type GetCategoriesQueryResponse = GetCategories200

export type GetCategoriesQuery = {
  Response: GetCategories200
  QueryParams: GetCategoriesQueryParams
  Errors: GetCategories422
}