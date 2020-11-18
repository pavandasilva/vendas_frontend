import { AlertControllerImp } from '../../../infra/alertController'
import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { RouteControllerImp } from '../../../infra/http/routeController'
import { FuncionarioServiceImpl } from '../services/funcionarioService'
import { TrazerSugestoesClientesFidelizados } from '../useCases/trazerSugestoesClientesFidelizados'

export function makeTrazerSugestoesClientesFidelizados (): TrazerSugestoesClientesFidelizados {
  const httpRequest = new HttpRequestImpl()
  const routeController = new RouteControllerImp()
  const alertController = new AlertControllerImp()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest, routeController, alertController)
  return new TrazerSugestoesClientesFidelizados(funcionarioService)
}
