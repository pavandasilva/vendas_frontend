import { AlertControllerImp } from '../../../infra/alertController'
import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { RouteControllerImp } from '../../../infra/http/routeController'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerClientePorId } from '../useCases'

export function makeTrazerClientePorId (): TrazerClientePorId {
  const httpRequest = new HttpRequestImpl()
  const routerController = new RouteControllerImp()
  const alertController = new AlertControllerImp()
  const clienteService = new ClienteServiceImpl(httpRequest, routerController, alertController)

  return new TrazerClientePorId(clienteService)
}
