import { ModelBase } from '../../_interfaces'
import { Telefone } from './telefone'

export interface Contato extends ModelBase {
  id?: number | string
  nome?: string
  email?: string
  fiscal: 's'|'n'
  comercial: 's'|'n'
  financeiro: 's'|'n'
  status?: 'ativo'| 'inativo'
  telefones?: Telefone[]
}
