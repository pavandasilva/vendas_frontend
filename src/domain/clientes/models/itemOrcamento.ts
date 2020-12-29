import { Preco } from '../../produtos/models';
import { Produto } from '../../produtos/models/produto'

export interface ItemOrcamento {
  produto: Produto
  quantidade: number
  preco?: Preco
}
