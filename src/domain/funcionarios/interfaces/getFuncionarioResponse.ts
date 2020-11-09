import { GetResponseDefault } from '../../_interfaces'
import { Funcionario } from '../models/funcionario'

export interface GetFuncionarioResponse extends GetResponseDefault {
  data: Funcionario []
}
