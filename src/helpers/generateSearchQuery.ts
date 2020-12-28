import { FilterOptions } from '../domain/_interfaces/filterOptions'

export function generateSearchQuery (
  filter?: string | undefined,
  filterOptions?: FilterOptions,
  filterObject?: object): string {
  let result = ''

  if (filter) {
    result = `?search=${filter}`
  }

  if (filterOptions) {
    Object.keys(filterOptions).forEach(key => {
      result += `${result.length ? '&' : '?'}${key}=${filterOptions[key as keyof FilterOptions]}`
    })
  }

  if (filterObject) {
    Object.keys(filterObject).forEach(key => {
      result += `${result.length ? '&' : '?'}${key}=${filterObject[key as keyof object]}`
    })
  }

  return result
}
