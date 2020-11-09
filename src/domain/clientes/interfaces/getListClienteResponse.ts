import { GetResponseDefault } from '../../_interfaces'
import { Cliente } from '../models/cliente'

export interface GetListClienteResponse extends GetResponseDefault {
  data: Cliente []
}
