import { generateSearchQuery } from '../../../helpers'
import { GetParams } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { ClienteService, GetListClienteResponse, GetOneClienteResponse } from '../interfaces'

export class ClienteServiceImpl implements ClienteService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
  }

  async getlist (params: GetParams): Promise<GetListClienteResponse> {
    let { filter, filterOptions, token } = params
    const query = generateSearchQuery(filter, filterOptions)

    const response = await this.httpRequest.get({
      path: 'clientes',
      token,
      query
    })

    return response.data as GetListClienteResponse
  }

  async getById (params: GetParams): Promise<GetOneClienteResponse> {
    let { filter: id, token } = params

    const response = await this.httpRequest.get({
      path: `clientes/${id}`,
      token
    })

    return response.data as GetOneClienteResponse
  }
}
