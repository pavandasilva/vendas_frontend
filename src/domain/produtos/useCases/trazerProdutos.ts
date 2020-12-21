import { ProdutoService, GetProdutosListResponse } from '../interfaces'

export class TrazerProdutos {
  private readonly produtoService: ProdutoService

  constructor (produtoService: ProdutoService) {
    this.produtoService = produtoService
  }

  async execute (token: string, limit: number, skip: number, search:string): Promise<GetProdutosListResponse> {
    return await this.produtoService.getlist({
      token,
      filter: search,
      filterOptions: {
        limit,
        skip
      }
    })
  }
}
