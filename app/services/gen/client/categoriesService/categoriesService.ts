/* eslint-disable no-alert, no-console */
import { getCategories } from './getCategories.ts'
import { getPagesByCategory } from './getPagesByCategory.ts'

export function categoriesService() {
  return { getCategories, getPagesByCategory }
}