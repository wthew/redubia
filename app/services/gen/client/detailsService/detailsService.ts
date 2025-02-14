/* eslint-disable no-alert, no-console */
import { getCategoriesForPage } from './getCategoriesForPage.ts'
import { getCover } from './getCover.ts'
import { getDetails } from './getDetails.ts'
import { getGallery } from './getGallery.ts'

export function detailsService() {
  return { getCover, getDetails, getCategoriesForPage, getGallery }
}