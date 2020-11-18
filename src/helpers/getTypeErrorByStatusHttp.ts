type ResponseType = 'auth' | 'server'

export function getTypeErrorByStatusHttp (status: number): ResponseType {
  if (status === 401) {
    return 'auth'
  } else {
    return 'server'
  }
}
