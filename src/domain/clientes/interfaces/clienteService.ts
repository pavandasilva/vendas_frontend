import { GetDadosClienteCNPJResponse, GetListClienteResponse, GetOneClienteResponse } from '.'
import { GetParams, PostParams } from '../../_interfaces'
import { Cliente } from '../models/cliente'
import { GetEnderecoPorCep } from './getEnderecoPorCep'

export interface ClienteService {
  getlist: (params: GetParams) => Promise <GetListClienteResponse>
  getById: (params: GetParams) => Promise<GetOneClienteResponse>
  create: (params: PostParams) => Promise<Cliente>
  getDadosReceitaPorCNPJ: (params: GetParams) => Promise<GetDadosClienteCNPJResponse>
  getEnderecoPorCep: (params: GetParams) => Promise<GetEnderecoPorCep>
}
