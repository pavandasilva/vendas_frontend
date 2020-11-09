import { GetParams } from '../../_interfaces'
import { EmpresaService, GetOneEmpresaResponse } from '../interfaces'

export class TrazerEmpresaPorId {
  private readonly empresaService: EmpresaService

  constructor (empresaService: EmpresaService) {
    this.empresaService = empresaService
  }

  async execute (params: GetParams): Promise<GetOneEmpresaResponse> {
    const response = await this.empresaService.getById(params)
    return response
  }
}
