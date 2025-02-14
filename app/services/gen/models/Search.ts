import type { Error } from './Error.ts'

export const searchNsEnum = {
  article: 'article',
  file: 'file',
  categories: 'categories',
  with_audio: 'with_audio',
} as const

export type SearchNsEnum = (typeof searchNsEnum)[keyof typeof searchNsEnum]

export type Search = {
  /**
   * @type string
   */
  ns: SearchNsEnum
  /**
   * @type integer | undefined
   */
  id?: number | undefined
  /**
   * @type string | undefined
   */
  title?: string | undefined
}

export type SearchQueryParams = {
  /**
   * @type string | undefined
   */
  q?: string | undefined
}

/**
 * @description OK
 */
export type Search200 = Search[]

/**
 * @description Unprocessable Content
 */
export type Search422 = Error

/**
 * @description Default error response
 */
export type SearchError = Error

export type SearchQueryResponse = Search200

export type SearchQuery = {
  Response: Search200
  QueryParams: SearchQueryParams
  Errors: Search422
}