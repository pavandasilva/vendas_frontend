import { ClienteService, GetDadosClienteCNPJResponse } from '../interfaces'

export class TrazerDadosCNPJ {
  private readonly clienteService: ClienteService

  constructor (clienteService: ClienteService) {
    this.clienteService = clienteService
  }

  async execute (token: string, cnpj: string): Promise<GetDadosClienteCNPJResponse> {
    const response = await this.clienteService.getDadosReceitaPorCNPJ({
      filter: cnpj,
      token
    })
    return response
  }
}
