import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerClientes } from '../useCases'

export function makeTrazerClientes (): TrazerClientes {
  const httpRequest = new HttpRequestImpl()
  const clienteService = new ClienteServiceImpl(httpRequest)
  return new TrazerClientes(clienteService)
}
