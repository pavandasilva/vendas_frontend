import { generateSearchQuery } from '../../../helpers'
import { GetParams } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { EmpresaService, GetListEmpresaResponse, GetOneEmpresaResponse } from '../interfaces'

export class EmpresaServiceImpl implements EmpresaService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
  }

  async getlist (params: GetParams): Promise<GetListEmpresaResponse> {
    let { filter, filterOptions, token } = params
    const query = generateSearchQuery(filter, filterOptions)

    const response = await this.httpRequest.get({
      path: 'empresas',
      token,
      query
    })

    return response?.data as GetListEmpresaResponse
  }

  async getById (params: GetParams): Promise<GetOneEmpresaResponse> {
    let { filter: id, token } = params

    const response = await this.httpRequest.get({
      path: `empresas/${id}`,
      token
    })

    return response?.data as GetOneEmpresaResponse
  }
}
