import { GetFuncionarioResponse } from '.'
import { GetParams } from '../../_interfaces'
import { GetClientesFuncionarioResponse } from './getClientesFuncionarioResponse'

export interface FuncionarioService {
  getlist: (params: GetParams) => Promise <GetFuncionarioResponse>
  getClientes: (funcionarioId: number, token: string, limit?: number, skip?: number, search?: string) => Promise <GetClientesFuncionarioResponse>
}
