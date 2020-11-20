import { HttpRequestError } from '../domain/_interfaces/httpRequest'
import { AppError } from './appError'

export function handleErrors (error?: HttpRequestError): void {
  if (error) {
    if (error.status === 401) {
      throw new AppError({
        message: error.message || 'Erro de autenticação',
        type: 'auth'
      })
    } else {
      let errorMessage = error.message
      if (errorMessage === 'Network Error') {
        errorMessage = 'Erro de conexão'
      }

      throw new AppError({
        message: error.message || 'Erro desconhecido',
        type: 'api'
      })
    }
  }
}
