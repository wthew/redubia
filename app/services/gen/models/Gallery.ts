import type { ImageFile } from './ImageFile.ts'

export type Gallery = {
  /**
   * @type integer
   */
  id: number
  /**
   * @type object
   */
  original: ImageFile
  /**
   * @type object
   */
  thumbnail: ImageFile
  /**
   * @type string | undefined
   */
  title?: string | undefined
}