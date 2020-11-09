import { GetParams } from '../../_interfaces'
import { ClienteService, GetOneClienteResponse } from '../interfaces'

export class TrazerClientePorId {
  private readonly clienteService: ClienteService

  constructor (clienteService: ClienteService) {
    this.clienteService = clienteService
  }

  async execute (params: GetParams): Promise<GetOneClienteResponse> {
    const response = await this.clienteService.getById(params)
    return response
  }
}
