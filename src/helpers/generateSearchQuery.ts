import { FilterOptions } from '../domain/_interfaces/filterOptions'

export function generateSearchQuery (words?: string | undefined, filterOptions?: FilterOptions): string {
  let result = ''

  if (words) {
    result = `?search=${words}`
  }

  if (filterOptions) {
    Object.keys(filterOptions).forEach(key => {
      result += `${result.length ? '&' : '?'}${key}=${filterOptions[key as keyof FilterOptions]}`
    })
  }

  return result
}
