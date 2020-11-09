import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { EmpresaServiceImpl } from '../services/empresaService'
import { TrazerEmpresaPorId } from '../useCases'

export function makeTrazerEmpresaPorId (): TrazerEmpresaPorId {
  const httpRequest = new HttpRequestImpl()
  const empresaService = new EmpresaServiceImpl(httpRequest)
  return new TrazerEmpresaPorId(empresaService)
}
