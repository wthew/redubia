import type { Cover } from './Cover.ts'

export type PageDetails = {
  /**
   * @type string
   */
  title: string
  /**
   * @type string
   */
  summary: string
  /**
   * @type object
   */
  cover: Cover
}