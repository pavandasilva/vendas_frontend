import { GetParams } from '../../_interfaces'
import { GetProdutosListResponse } from './getProdutosListResponse'

export interface ProdutoService {
  getlist: (params: GetParams) => Promise <GetProdutosListResponse>
}
