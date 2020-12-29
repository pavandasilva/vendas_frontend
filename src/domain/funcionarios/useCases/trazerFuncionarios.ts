import { GetParams } from '../../_interfaces'
import { FuncionarioService, GetListFuncionarioResponse } from '../interfaces'

export class TrazerFuncionarios {
  private readonly funcionarioService: FuncionarioService

  constructor (funcionarioService: FuncionarioService) {
    this.funcionarioService = funcionarioService
  }

  async execute (params: GetParams): Promise<GetListFuncionarioResponse> {
    return await this.funcionarioService.getlist(params)
  }
}
