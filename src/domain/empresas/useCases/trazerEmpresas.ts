import { EmpresaService, GetListEmpresaResponse } from '../interfaces'

export class TrazerEmpresas {
  private readonly empresaService: EmpresaService

  constructor (empresaService: EmpresaService) {
    this.empresaService = empresaService
  }

  async execute (token: string, limit: number, skip: number, search:string): Promise<GetListEmpresaResponse> {
    const response = await this.empresaService.getlist({
      token,
      filter: search,
      filterOptions: {
        limit,
        skip
      }
    })

    return response
  }
}
