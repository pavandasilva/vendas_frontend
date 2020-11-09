import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { GetHttpRequest, HttpRequest, PostHttpRequest } from '../../domain/_interfaces/httpRequest'

export class HttpRequestImpl implements HttpRequest {
  private readonly httpRequest: AxiosInstance

  constructor () {
    this.httpRequest = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL_API_VENDAS
    })
  }

  async get<T> (getHttpRequest: GetHttpRequest): Promise<{
    data?: T
    status: number
    error?: string
  }> {
    try {
      const { path, token, url, query } = getHttpRequest

      let config: AxiosRequestConfig = {} as AxiosRequestConfig

      if (token) {
        config = {
          headers: { Authorization: `Bearer ${token}` }
        }
      }

      const response = await this.httpRequest.get(`${url || ''}${path}${query || ''}`, config)

      const result = {
        data: response.data as T,
        status: response.status
      }

      return result
    } catch (error) {
      const result = {
        data: error.data as T,
        status: error.status,
        error
      }

      return result
    }
  }

  async post<T> (postHttpRequest:PostHttpRequest): Promise <T | undefined> {
    try {
      const { url, path, body, token } = postHttpRequest
      let config: AxiosRequestConfig = {} as AxiosRequestConfig

      if (token) {
        config = {
          headers: { Authorization: `Bearer ${token}` }
        }
      }

      const response = await this.httpRequest.post(`${url || ''}${path}`, body, config)
      return response.data as T
    } catch ({ response }) {
      throw new Error(response.data.message)
    }
  }
}
