import { PostParams } from '../../../_interfaces'
import { HttpRequest } from '../../../_interfaces/httpRequest'
import { PedidoService } from '../../interfaces/pedidoService'
import { Orcamento } from '../orcamento'

export class PedidoServiceHttpRequest implements PedidoService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
  }

  async create (params: PostParams): Promise<Orcamento> {
    const orcamento: Orcamento = {} as Orcamento
    return orcamento
  }
}
