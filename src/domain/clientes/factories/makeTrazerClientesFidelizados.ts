import { AlertControllerImp } from '../../../infra/alertController'
import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { RouteControllerImp } from '../../../infra/http/routeController'
import { FuncionarioServiceImpl } from '../../funcionarios/services/funcionarioService'
import { TrazerClientesFidelizados } from '../useCases/trazerClientesFidelizados'

export function makeTrazerClientesFidelizados (): TrazerClientesFidelizados {
  const httpRequest = new HttpRequestImpl()
  const routeController = new RouteControllerImp()
  const alertController = new AlertControllerImp()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest, routeController, alertController)
  return new TrazerClientesFidelizados(funcionarioService)
}
