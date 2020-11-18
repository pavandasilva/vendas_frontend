import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { GetHttpRequest, HttpRequest, HttpRequestError, PostHttpRequest } from '../../domain/_interfaces/httpRequest'

export class HttpRequestImpl implements HttpRequest {
  private readonly httpRequest: AxiosInstance

  constructor () {
    this.httpRequest = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL_API_VENDAS
    })
  }

  async get<T> (getHttpRequest: GetHttpRequest): Promise<{
    data?: T
    status?: number
    error?: HttpRequestError
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
        error: {
          message: error.response.data.message || error.message,
          status: error.response?.status
        }
      }
      return result
    }
  }

  async post<T> (postHttpRequest:PostHttpRequest): Promise<{
    data?: T
    status?: number
    error?: HttpRequestError
  }> {
    try {
      const { url, path, body, token } = postHttpRequest
      let config: AxiosRequestConfig = {} as AxiosRequestConfig

      if (token) {
        config = {
          headers: { Authorization: `Bearer ${token}` }
        }
      }

      const response = await this.httpRequest.post(`${url || ''}${path}`, body, config)

      const result = {
        data: response.data as T,
        status: response.status
      }

      return result
    } catch (error) {
      const result = {
        error: {
          message: error.response.data.message || error.message,
          status: error.response?.status
        }
      }
      return result
    }
  }
}
