import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../services/funcionarioService'
import { TrazerFuncionarioPorId } from '../useCases/trazerFuncionarioPorId'

export function makeTrazerFuncionarioPorId (): TrazerFuncionarioPorId {
  const httpRequest = new HttpRequestImpl()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest)

  return new TrazerFuncionarioPorId(funcionarioService)
}
