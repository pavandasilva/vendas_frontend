import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../services/funcionarioService'
import { TrazerSugestoesClientesFidelizados } from '../useCases/trazerSugestoesClientesFidelizados'

export function makeTrazerSugestoesClientesFidelizados (): TrazerSugestoesClientesFidelizados {
  const httpRequest = new HttpRequestImpl()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest)
  return new TrazerSugestoesClientesFidelizados(funcionarioService)
}
