export interface PostHttpRequest {
  body?: object,
  url?: string,
  path: string,
  token?: string
}

export interface GetHttpRequest {
  query?: string
  path: string,
  url?: string,
  token?: string
}

export interface HttpRequestError {
  status?: number
  message?: string
}

export interface HttpRequest {
  get: <T> (getHttpRequest: GetHttpRequest) => Promise<{
    data?: T
    status?: number
    error?: HttpRequestError
  }>
  post: <T> (postHttpRequest: PostHttpRequest) => Promise <T | undefined>
}
