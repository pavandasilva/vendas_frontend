import { ProdutoService, GetProdutosListResponse } from '../interfaces'

export class TrazerProdutos {
  private readonly produtoService: ProdutoService

  constructor (produtoService: ProdutoService) {
    this.produtoService = produtoService
  }

  async execute (query: string): Promise<GetProdutosListResponse> {
    return await this.produtoService.getlist({
      filter: query
    })
  }
}
