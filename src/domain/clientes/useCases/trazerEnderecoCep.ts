import { ClienteService } from '../interfaces'
import { GetEnderecoPorCep } from '../interfaces/getEnderecoPorCep'

export class TrazerEnderecoCep {
  private readonly clienteService: ClienteService

  constructor (clienteService: ClienteService) {
    this.clienteService = clienteService
  }

  async execute (cep: string): Promise<GetEnderecoPorCep> {
    const response = await this.clienteService.getEnderecoPorCep({
      filter: cep
    })

    return response
  }
}
