import { Produto } from '../../produtos/models/produto'

export interface ItemOrcamento {
  produto: Produto
  quantidade: number
}
