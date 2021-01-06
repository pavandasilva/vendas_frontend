import { HttpRequestImpl } from '../../../infra/http'
import { PedidoServiceHttpRequest } from '../models/services/pedidoService'
import { GravarOrcamento } from '../models/useCases/gravarOrcamento'

export function makeGravarOrcamento (): GravarOrcamento {
  const httpRequest = new HttpRequestImpl()
  const pedidoService = new PedidoServiceHttpRequest(httpRequest)

  return new GravarOrcamento(pedidoService)
}
