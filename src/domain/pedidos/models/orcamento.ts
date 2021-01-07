import { ItemOrcamento } from '.'
import { ModoPagamentoType } from '../../../app/contexts'
import { Contato, Cliente } from '../../clientes/models'
import { Empresa } from '../../empresas/models/empresa'
import { Funcionario } from '../../funcionarios/models/funcionario'

export interface Orcamento {
  itens?: ItemOrcamento[]
  subtotal?: number
  total?: number
  st?: number
  icms?: number
  deposito?: Empresa
  contato?: Contato
  funcionario?: Funcionario
  funcionario2?: Funcionario
  condicao?: string
  cliente?: Cliente
  transportadora?: Cliente
  juros?: number
  modoPagamento?: ModoPagamentoType
  descontos?: number
  acrescimos?: number
  qtdeItens?: number
}
