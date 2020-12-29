import { generateSearchQuery } from '../../../helpers'
import { handleErrors } from '../../../helpers/handleErrors'
import { GetParams } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { FuncionarioService, GetClientesFuncionarioResponse, GetListFuncionarioResponse } from '../interfaces'
import { GetClientesSuggestionResponse } from '../interfaces/getClientesSuggestionResponse'

export class FuncionarioServiceImpl implements FuncionarioService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
  }

  async getlist (params: GetParams): Promise<GetListFuncionarioResponse> {
    let { filter, filterOptions, token } = params
    const query = generateSearchQuery(filter, filterOptions)

    const response = await this.httpRequest.get({
      path: 'funcionarios',
      token,
      query
    })

    return response?.data as GetListFuncionarioResponse
  }

  async getClientes (
    funcionarioId: number,
    token: string,
    limit?: number,
    skip?: number,
    search?: string
  ): Promise<GetClientesFuncionarioResponse> {
    let query = `?limit=${limit}&skip=${skip}`

    if (search) {
      query += `&search=${search}`
    }

    const response = await this.httpRequest.get({
      path: `funcionarios/${funcionarioId}/clientes/`,
      query,
      token
    })

    handleErrors(response?.error)
    return response?.data as GetClientesFuncionarioResponse
  }

  async getClientesSuggestions (params: GetParams): Promise<GetClientesSuggestionResponse> {
    const response = await this.httpRequest.get({
      path: 'clientes/sugestao_palavras',
      query: `?q=${params.filter}`,
      token: params.token
    })

    handleErrors(response?.error)
    return response as GetClientesSuggestionResponse
  }
}
