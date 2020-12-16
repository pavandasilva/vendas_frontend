export function deleteEmptyPropsFromObject (obj: any): object {
  let objectSanitezed = {}

  Object.keys(obj).map(key => {
    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
      objectSanitezed = {
        ...objectSanitezed,
        [key]: obj[key]
      }
    }
  })

  return objectSanitezed
}
