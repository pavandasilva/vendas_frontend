import { FuncionarioService, GetFuncionarioResponse } from '../interfaces'

export class TrazerFuncionarios {
  private readonly funcionarioService: FuncionarioService

  constructor (funcionarioService: FuncionarioService) {
    this.funcionarioService = funcionarioService
  }

  async execute (query: string): Promise<GetFuncionarioResponse> {
    return { } as GetFuncionarioResponse
  /*   return await this.usuarioService.login(email, password) */
  }
}
