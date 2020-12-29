import { GetParams } from '../../_interfaces'
import { Preco } from '../models'
import { GetProdutosListResponse } from './getProdutosListResponse'

export interface ProdutoService {
  getlist: (params: GetParams) => Promise <GetProdutosListResponse>
  getPreco: (produtoId: number, clienteId: number, empresaId: number, token: string) => Promise <Preco>
}
