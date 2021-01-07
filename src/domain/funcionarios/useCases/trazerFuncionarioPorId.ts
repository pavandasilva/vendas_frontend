import { GetParams } from '../../_interfaces'
import { FuncionarioService } from '../interfaces'
import { GetFuncionario } from '../interfaces/getFuncionario'

export class TrazerFuncionarioPorId {
  private readonly funcionarioService: FuncionarioService

  constructor (funcionarioService: FuncionarioService) {
    this.funcionarioService = funcionarioService
  }

  async execute (params: GetParams): Promise<GetFuncionario> {
    const response = await this.funcionarioService.getById(params)
    return response
  }
}
