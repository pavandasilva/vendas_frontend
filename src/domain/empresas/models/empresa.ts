import { ModelBase } from '../../_interfaces'

export interface Empresa extends ModelBase{
  id?: number,
  nome?: string,
  cidade?: string,
  uf?: string,
  updated_at?: string,
  created_at?: string
}
