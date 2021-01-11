import { Preco } from '../../produtos/models'
import { Produto } from '../../produtos/models/produto'

export interface ItemOrcamento {
  produto?: Produto
  quantidade: number
  preco?: Preco
  acrescimo?: number
  desconto?: number
  stTotal?: number
  icmsItem?: number
  total?: number
  valorUnitario?: number
}
