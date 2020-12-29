import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { ProdutoServiceImpl } from '../services/produtoService'
import { TrazerPrecoProduto } from '../useCases/trazerPrecoProduto'

export function makeTrazerPrecoProduto (): TrazerPrecoProduto {
  const httpRequest = new HttpRequestImpl()
  const produtoService = new ProdutoServiceImpl(httpRequest)

  return new TrazerPrecoProduto(produtoService)
}
