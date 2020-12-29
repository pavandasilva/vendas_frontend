import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { FuncionarioServiceImpl } from '../../funcionarios/services/funcionarioService'
import { TrazerClientesFidelizados } from '../useCases/trazerClientesFidelizados'

export function makeTrazerClientesFidelizados (): TrazerClientesFidelizados {
  const httpRequest = new HttpRequestImpl()
  const funcionarioService = new FuncionarioServiceImpl(httpRequest)
  return new TrazerClientesFidelizados(funcionarioService)
}
