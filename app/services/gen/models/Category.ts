import type { ImageFile } from './ImageFile.ts'

export const categoryNsEnum = {
  article: 'article',
  file: 'file',
  categories: 'categories',
  with_audio: 'with_audio',
} as const

export type CategoryNsEnum = (typeof categoryNsEnum)[keyof typeof categoryNsEnum]

export type Category = {
  /**
   * @type integer
   */
  id: number
  /**
   * @type string
   */
  ns: CategoryNsEnum
  /**
   * @type string
   */
  title: string
  /**
   * @type object
   */
  thumbnail: ImageFile
}