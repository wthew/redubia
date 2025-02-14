import type { Page } from './Page.ts'

export type Pages = {
  next_cursor?: unknown | undefined
  cursor?: unknown | undefined
  /**
   * @type array | undefined
   */
  results?: Page[] | undefined
}