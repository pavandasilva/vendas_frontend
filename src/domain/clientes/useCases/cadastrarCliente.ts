import { PostParams } from '../../_interfaces'
import { ClienteService } from '../interfaces'
import { Cliente } from '../models/cliente'

export class CadastrarCliente {
  private readonly clienteService: ClienteService

  constructor (clienteService: ClienteService) {
    this.clienteService = clienteService
  }

  async execute (params: PostParams): Promise<Cliente> {
    const response = await this.clienteService.create(params)
    return response
  }
}
