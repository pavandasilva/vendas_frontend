import { GetListFuncionarioResponse } from '.'
import { GetParams } from '../../_interfaces'
import { GetClientesFuncionarioResponse } from './getClientesFuncionarioResponse'
import { GetClientesSuggestionResponse } from './getClientesSuggestionResponse'
import { GetFuncionario } from './getFuncionario'

export interface FuncionarioService {
  getById: (params: GetParams) => Promise<GetFuncionario>
  getlist: (params: GetParams) => Promise <GetListFuncionarioResponse>
  getClientes: (
    funcionarioId: number,
    token: string,
    limit?: number,
    skip?: number,
    search?: string
    ) => Promise <GetClientesFuncionarioResponse>
  getClientesSuggestions: (params: GetParams) => Promise<GetClientesSuggestionResponse>
}
