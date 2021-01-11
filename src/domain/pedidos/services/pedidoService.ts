import { handleErrors } from '../../../helpers/handleErrors'
import { PostParams } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { PedidoService } from '../interfaces/pedidoService'
import { ItemOrcamento } from '../models'
import { Orcamento } from '../models/orcamento'

interface ItemOrcamentoApi {
  produto_id: number,
  valor: number,
  quantidade: number
}

interface OrcamentoApi {
  deposito_id: number,
  cliente_id: number,
  funcionario_id: number,
  transportadora_id: number,
  itens: ItemOrcamento[]
}

export function sanetizeOrcamento (orcamento: Orcamento): OrcamentoApi {
  const itens = orcamento?.itens?.map(item => {
    const total = item?.total as number - (item?.stTotal || 0)
    const valor = total / item.quantidade

    const itemOrcamento: ItemOrcamentoApi = {
      produto_id: item?.produto?.id as number,
      quantidade: item?.quantidade,
      valor
    }

    return itemOrcamento
  })

  return {
    deposito_id: orcamento?.deposito?.id as number,
    cliente_id: orcamento?.cliente?.id as number,
    funcionario_id: orcamento?.funcionario?.id as unknown as number,
    transportadora_id: orcamento?.transportadora?.id as number,
    itens: itens as ItemOrcamentoApi[]
  }
}

export class PedidoServiceHttpRequest implements PedidoService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
  }

  async create (params: PostParams): Promise<OrcamentoApi> {
    const sanetized = sanetizeOrcamento(params.body as Orcamento)

    const response = await this.httpRequest.post<OrcamentoApi>({
      path: 'pedidos',
      body: sanetized,
      token: params.token
    })

    handleErrors(response?.error)
    return response?.data as OrcamentoApi
  }
}
