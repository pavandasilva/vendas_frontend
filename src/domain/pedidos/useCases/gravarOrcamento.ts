import { PostParams } from '../../_interfaces'
import { PedidoService } from '../interfaces/pedidoService'
import { Orcamento } from '../models'

export class GravarOrcamento {
  private readonly pedidoService: PedidoService

  constructor (pedidoService: PedidoService) {
    this.pedidoService = pedidoService
  }

  async execute (params: PostParams): Promise<Orcamento> {
    return await this.pedidoService.create(params)
  }
}
