import { GetParams } from '../../_interfaces'
import { GetPrecoProdutoResponse } from './getPrecoProdutoResponse'
import { GetProdutosListResponse } from './getProdutosListResponse'

export interface ProdutoService {
  getlist: (params: GetParams) => Promise <GetProdutosListResponse>
  getPreco: (produtoId: number, clienteId: number, empresaId: number, token: string, valor?: number) => Promise <GetPrecoProdutoResponse>
}
