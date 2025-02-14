export type Error = {
  /**
   * @description Error code
   * @type integer | undefined
   */
  code?: number | undefined
  /**
   * @description Error name
   * @type string | undefined
   */
  status?: string | undefined
  /**
   * @description Error message
   * @type string | undefined
   */
  message?: string | undefined
  /**
   * @description Errors
   * @type object | undefined
   */
  errors?:
    | {
        [key: string]: unknown
      }
    | undefined
}