import { RouteController, AlertController } from '../domain/_interfaces'
import { HttpRequestError } from '../domain/_interfaces/httpRequest'

export function handleErrors (routeController: RouteController, alertController: AlertController, error?: HttpRequestError): void {
  if (error) {
    if (error.status === 401) {
      routeController.goTo('/login')
    } else {
      let errorMessage = error.message

      if (errorMessage === 'Network Error') {
        errorMessage = 'Erro de conexão'
      }

      alertController.error(errorMessage || 'Erro desconhecido')
    }
  }
}
