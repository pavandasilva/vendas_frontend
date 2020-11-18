import { generateSearchQuery } from '../../../helpers'
import { handleErrors } from '../../../helpers/handleErrors'
import { AlertController, GetParams, RouteController } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { ClienteService, GetListClienteResponse, GetOneClienteResponse } from '../interfaces'

export class ClienteServiceImpl implements ClienteService {
  private readonly httpRequest: HttpRequest
  private readonly routeController: RouteController
  private readonly alertController: AlertController

  constructor (httpRequest: HttpRequest, routeController: RouteController, alertController: AlertController) {
    this.httpRequest = httpRequest
    this.routeController = routeController
    this.alertController = alertController
  }

  async getlist (params: GetParams): Promise<GetListClienteResponse> {
    let { filter, filterOptions, token } = params
    const query = generateSearchQuery(filter, filterOptions)

    const response = await this.httpRequest.get({
      path: 'clientes',
      token,
      query
    })

    handleErrors(this.routeController, this.alertController, response.error)
    return response.data as GetListClienteResponse
  }

  async getById (params: GetParams): Promise<GetOneClienteResponse> {
    let { filter: id, token } = params

    const response = await this.httpRequest.get({
      path: `clientes/${id}`,
      token
    })

    handleErrors(this.routeController, this.alertController, response.error)
    return response.data as GetOneClienteResponse
  }
}
