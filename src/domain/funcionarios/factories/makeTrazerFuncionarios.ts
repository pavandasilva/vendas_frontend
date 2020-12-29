import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../services/funcionarioService'
import { TrazerFuncionarios } from '../useCases/trazerFuncionarios'

export function makeTrazerFuncionarios (): TrazerFuncionarios {
  const httpRequest = new HttpRequestImpl()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest)

  return new TrazerFuncionarios(funcionarioService)
}
