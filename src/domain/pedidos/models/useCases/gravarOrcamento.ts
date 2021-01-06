import { PostParams } from '../../../_interfaces'
import { PedidoService } from '../../interfaces/pedidoService'

export class GravarOrcamento {
  private readonly pedidoService: PedidoService

  constructor (pedidoService: PedidoService) {
    this.pedidoService = pedidoService
  }

  execute (params: PostParams) {
    this.pedidoService.create(params)
  }
}
