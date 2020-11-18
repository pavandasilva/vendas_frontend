import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerClientes } from '../useCases'
import { RouteControllerImp } from '../../../infra/http/routeController'
import { AlertControllerImp } from '../../../infra/alertController'

export function makeTrazerClientes (): TrazerClientes {
  const httpRequest = new HttpRequestImpl()
  const routerController = new RouteControllerImp()
  const alertController = new AlertControllerImp()
  const clienteService = new ClienteServiceImpl(httpRequest, routerController, alertController)

  return new TrazerClientes(clienteService)
}
