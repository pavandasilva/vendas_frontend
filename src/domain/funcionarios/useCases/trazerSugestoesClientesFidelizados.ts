import { GetParams } from '../../_interfaces'
import { FuncionarioService } from '../interfaces'

export class TrazerSugestoesClientesFidelizados {
  private readonly funcionarioService: FuncionarioService

  constructor (funcionarioService: FuncionarioService) {
    this.funcionarioService = funcionarioService
  }

  async execute (params: GetParams): Promise<string[]> {
    const response = await this.funcionarioService.getClientesSuggestions(params)
    return response?.data
  }
}
