import { GetResponseDefault } from '../../_interfaces'
import { Empresa } from '../models/empresa'

export interface GetOneEmpresaResponse extends GetResponseDefault {
  data: Empresa
}
