import { GetListFuncionarioResponse } from '.'
import { GetParams } from '../../_interfaces'
import { GetClientesFuncionarioResponse } from './getClientesFuncionarioResponse'
import { GetClientesSuggestionResponse } from './getClientesSuggestionResponse'

export interface FuncionarioService {
  getlist: (params: GetParams) => Promise <GetListFuncionarioResponse>
  getClientes: (funcionarioId: number, token: string, limit?: number, skip?: number, search?: string) => Promise <GetClientesFuncionarioResponse>
  getClientesSuggestions: (params: GetParams) => Promise<GetClientesSuggestionResponse>
}
