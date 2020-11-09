import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { EmpresaServiceImpl } from '../services/empresaService'
import { TrazerEmpresas } from '../useCases/trazerEmpresas'

export function makeTrazerEmpresas (): TrazerEmpresas {
  const httpRequest = new HttpRequestImpl()
  const empresaService = new EmpresaServiceImpl(httpRequest)
  return new TrazerEmpresas(empresaService)
}
