import { ProdutoService } from '../interfaces'
import { Preco } from '../models'

export class TrazerPrecoProduto {
  private readonly produtoService: ProdutoService

  constructor (produtoService: ProdutoService) {
    this.produtoService = produtoService
  }

  async execute (token: string, produtoId: number, clienteId: number, empresaId: number): Promise<Preco> {
    return await this.produtoService.getPreco(produtoId, clienteId, empresaId, token)
  }
}
