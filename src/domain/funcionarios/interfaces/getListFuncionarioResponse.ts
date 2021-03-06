import { GetResponseDefault } from '../../_interfaces'
import { HttpRequestError } from '../../_interfaces/httpRequest'
import { Funcionario } from '../models/funcionario'

export interface GetListFuncionarioResponse extends GetResponseDefault {
  data: Funcionario []
  error?: HttpRequestError
}
