import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerEnderecoCep } from '../useCases'

export function makeTrazerEnderecoCep (): TrazerEnderecoCep {
  const httpRequest = new HttpRequestImpl()
  const clienteService = new ClienteServiceImpl(httpRequest)
  return new TrazerEnderecoCep(clienteService)
}
