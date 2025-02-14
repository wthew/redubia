import type { Category } from './Category.ts'

export type Categories = {
  next_cursor?: unknown | undefined
  cursor?: unknown | undefined
  /**
   * @type array | undefined
   */
  results?: Category[] | undefined
}