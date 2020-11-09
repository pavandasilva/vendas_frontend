import { GetListClienteResponse, GetOneClienteResponse } from '.'
import { GetParams } from '../../_interfaces'

export interface ClienteService {
  getlist: (params: GetParams) => Promise <GetListClienteResponse>
  getById: (params: GetParams) => Promise<GetOneClienteResponse>
}
