import { GetResponseDefault } from '../../_interfaces'
import { Produto } from '../models/produto'

export interface GetProdutosListResponse extends GetResponseDefault {
  data: Produto []
}
