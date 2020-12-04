import { AlertControllerImp } from '../../../infra/alertController'
import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../services/funcionarioService'
import { TrazerSugestoesClientesFidelizados } from '../useCases/trazerSugestoesClientesFidelizados'

export function makeTrazerSugestoesClientesFidelizados (): TrazerSugestoesClientesFidelizados {
  const httpRequest = new HttpRequestImpl()
  const alertController = new AlertControllerImp()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest, alertController)
  return new TrazerSugestoesClientesFidelizados(funcionarioService)
}
