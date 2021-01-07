import { GetResponseDefault } from '../../_interfaces'
import { Funcionario } from '../models/funcionario'

export interface GetFuncionario extends GetResponseDefault{
  data: Funcionario
}
