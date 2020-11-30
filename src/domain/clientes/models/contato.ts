import { ModelBase } from '../../_interfaces'
import { Telefone } from './telefone'

export interface Contato extends ModelBase {
  id?: number | string
  nome?: string
  email?: string
  e_fiscal: 's'|'n'
  e_comercial: 's'|'n'
  e_financeiro: 's'|'n'
  status?: 'ativo'| 'inativo'
  telefones?: Telefone[]
}
