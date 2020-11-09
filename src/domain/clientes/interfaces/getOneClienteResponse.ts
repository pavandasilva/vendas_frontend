import { GetResponseDefault } from '../../_interfaces'
import { Cliente } from '../models/cliente'

export interface GetOneClienteResponse extends GetResponseDefault {
  data: Cliente
}
