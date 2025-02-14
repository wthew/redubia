import type { ImageFile } from './ImageFile.ts'

export const pageNsEnum = {
  article: 'article',
  file: 'file',
  categories: 'categories',
  with_audio: 'with_audio',
} as const

export type PageNsEnum = (typeof pageNsEnum)[keyof typeof pageNsEnum]

export type Page = {
  /**
   * @type integer
   */
  id: number
  /**
   * @type string
   */
  ns: PageNsEnum
  /**
   * @type string
   */
  title: string
  /**
   * @type object
   */
  thumbnail: ImageFile
}