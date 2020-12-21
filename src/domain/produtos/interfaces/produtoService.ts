import { GetParams } from '../../_interfaces'
import { GetProdutosResponse } from './getProdutosResponse'

export interface ProdutoService {
  getlist: (params: GetParams) => Promise <GetProdutosResponse>
}
