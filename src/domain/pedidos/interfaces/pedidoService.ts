import { PostParams } from '../../_interfaces'
import { Orcamento } from '../models'

export interface PedidoService {
  create:(params: PostParams) => Promise<Orcamento>
}
