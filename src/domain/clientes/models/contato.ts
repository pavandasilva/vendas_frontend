import { ModelBase } from '../../_interfaces'
import { Telefone } from './telefone'

export interface Contato extends ModelBase {
  id?: number | string
  nome?: string
  email?: string
  e_fiscal?: boolean
  e_comercial?: boolean
  e_financeiro?: boolean
  status?: 'ativo'| 'inativo'
  telefones: Telefone[]
}
