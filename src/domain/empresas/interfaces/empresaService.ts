import { GetListEmpresaResponse, GetOneEmpresaResponse } from '.'
import { GetParams } from '../../_interfaces'

export interface EmpresaService {
  getlist: (params: GetParams) => Promise <GetListEmpresaResponse>
  getById: (params: GetParams) => Promise<GetOneEmpresaResponse>
}
