import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ProdutoServiceImpl } from '../services/produtoService'
import { TrazerProdutos } from '../useCases/trazerProdutos'

export function makeTrazerProdutos (): TrazerProdutos {
  const httpRequest = new HttpRequestImpl()
  const produtoService = new ProdutoServiceImpl(httpRequest)

  return new TrazerProdutos(produtoService)
}
