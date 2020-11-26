import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerDadosCNPJ } from '../useCases/trazerDadosCNPJ'

export function makeTrazerDadosCNPJ (): TrazerDadosCNPJ {
  const httpRequest = new HttpRequestImpl()
  const clienteService = new ClienteServiceImpl(httpRequest)
  return new TrazerDadosCNPJ(clienteService)
}
