import { GetListClienteResponse, GetOneClienteResponse } from '.'
import { GetParams, PostParams } from '../../_interfaces'
import { Cliente } from '../models/cliente'

export interface ClienteService {
  getlist: (params: GetParams) => Promise <GetListClienteResponse>
  getById: (params: GetParams) => Promise<GetOneClienteResponse>
  create: (params: PostParams) => Promise<Cliente>
}
