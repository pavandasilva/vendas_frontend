import { HttpRequestImpl } from '../../../infra/http'
import { PedidoServiceHttpRequest } from '../services/pedidoService'
import { GravarOrcamento } from '../useCases/gravarOrcamento'

export function makeGravarOrcamento (): GravarOrcamento {
  const httpRequest = new HttpRequestImpl()
  const pedidoService = new PedidoServiceHttpRequest(httpRequest)

  return new GravarOrcamento(pedidoService)
}
