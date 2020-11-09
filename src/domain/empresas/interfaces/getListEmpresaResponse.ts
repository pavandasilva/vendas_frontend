import { GetResponseDefault } from '../../_interfaces'
import { Empresa } from '../models/empresa'

export interface GetListEmpresaResponse extends GetResponseDefault {
  data: Empresa []
}
