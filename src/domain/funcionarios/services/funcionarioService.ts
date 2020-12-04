import { handleErrors } from '../../../helpers/handleErrors'
import { GetParams, AlertController } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { FuncionarioService, GetClientesFuncionarioResponse, GetFuncionarioResponse } from '../interfaces'
import { GetClientesSuggestionResponse } from '../interfaces/getClientesSuggestionResponse'

export class FuncionarioServiceImpl implements FuncionarioService {
  private readonly httpRequest: HttpRequest
  private readonly alertController: AlertController

  constructor (httpRequest: HttpRequest, alertController: AlertController) {
    this.httpRequest = httpRequest
    this.alertController = alertController
  }

  async getlist (params: GetParams): Promise<GetFuncionarioResponse> {
    return {} as GetFuncionarioResponse
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
