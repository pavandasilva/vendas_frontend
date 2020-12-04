import { AlertControllerImp } from '../../../infra/alertController'
import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../../funcionarios/services/funcionarioService'
import { TrazerClientesFidelizados } from '../useCases/trazerClientesFidelizados'

export function makeTrazerClientesFidelizados (): TrazerClientesFidelizados {
  const httpRequest = new HttpRequestImpl()
  const alertController = new AlertControllerImp()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest, alertController)
  return new TrazerClientesFidelizados(funcionarioService)
}
