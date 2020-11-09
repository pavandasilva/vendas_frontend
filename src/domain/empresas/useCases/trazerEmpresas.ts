import { GetParams } from '../../_interfaces'
import { EmpresaService, GetListEmpresaResponse } from '../interfaces'

export class TrazerEmpresas {
  private readonly empresaService: EmpresaService

  constructor (empresaService: EmpresaService) {
    this.empresaService = empresaService
  }

  async execute (params: GetParams): Promise<GetListEmpresaResponse> {
    const response = await this.empresaService.getlist(params)
    return response
  }
}
