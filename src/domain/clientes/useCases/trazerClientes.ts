import { GetParams } from '../../_interfaces'
import { ClienteService, GetListClienteResponse } from '../interfaces'

export class TrazerClientes {
  private readonly clienteService: ClienteService

  constructor (clienteService: ClienteService) {
    this.clienteService = clienteService
  }

  async execute (params: GetParams): Promise<GetListClienteResponse> {
    const response = await this.clienteService.getlist(params)
    return response
  }
}
