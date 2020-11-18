import { AppError } from '../../../helpers'
import { getTypeErrorByStatusHttp } from '../../../helpers/getTypeErrorByStatusHttp'
import { GetParams } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { FuncionarioService, GetClientesFuncionarioResponse, GetFuncionarioResponse } from '../interfaces'

export class FuncionarioServiceImpl implements FuncionarioService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
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

    if (response?.error) {
      throw new AppError({
        message: response?.error?.message as string,
        type: getTypeErrorByStatusHttp(response?.error?.status as number)
      })
    }

    return response?.data as GetClientesFuncionarioResponse
  }
}
