import { ModelBase } from '../../_interfaces'

export interface Funcionario extends ModelBase{
  id?: string,
  nome?: string,
  cidade?: string,
  uf?: string
}
