import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerClientePorId } from '../useCases'

export function makeTrazerClientePorId (): TrazerClientePorId {
  const httpRequest = new HttpRequestImpl()
  const clienteService = new ClienteServiceImpl(httpRequest)
  return new TrazerClientePorId(clienteService)
}
