import { FuncionarioService } from '../../funcionarios/interfaces'
import { GetListClienteResponse } from '../interfaces'

export class TrazerClientesFidelizados {
  private readonly funcionarioService: FuncionarioService

  constructor (funcionarioService: FuncionarioService) {
    this.funcionarioService = funcionarioService
  }

  async execute (funcionarioId: number, token: string, limit: number, skip: number, search:string): Promise<GetListClienteResponse> {
    const response = await this.funcionarioService.getClientes(funcionarioId, token, limit, skip, search)
    return response
  }
}
