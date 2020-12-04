import { AlertControllerImp } from '../../../infra/alertController'
import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../services/funcionarioService'
import { TrazerFuncionarios } from '../useCases/trazerFuncionarios'

export function makeTrazerFuncionarios (): TrazerFuncionarios {
  const httpRequest = new HttpRequestImpl()
  const alertController = new AlertControllerImp()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest, alertController)

  return new TrazerFuncionarios(funcionarioService)
}
