import { Cliente } from '../../clientes/models/cliente'
import { GetResponseDefault } from '../../_interfaces'

export interface GetClientesFuncionarioResponse extends GetResponseDefault {
  data: Cliente []
}
