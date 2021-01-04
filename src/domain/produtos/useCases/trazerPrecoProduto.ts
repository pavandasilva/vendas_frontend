import { GetPrecoProdutoResponse, ProdutoService } from '../interfaces'

export class TrazerPrecoProduto {
  private readonly produtoService: ProdutoService

  constructor (produtoService: ProdutoService) {
    this.produtoService = produtoService
  }

  async execute (token: string, produtoId: number, clienteId: number, empresaId: number, valor?: number): Promise<GetPrecoProdutoResponse> {
    return await this.produtoService.getPreco(produtoId, clienteId, empresaId, token, valor)
  }
}
