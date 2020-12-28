import { generateSearchQuery } from '../../../helpers'
import { handleErrors } from '../../../helpers/handleErrors'
import { GetParams, PostParams, Validator } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { ClienteService, GetDadosClienteCNPJResponse, GetListClienteResponse, GetOneClienteResponse } from '../interfaces'
import { GetEnderecoPorCep } from '../interfaces/getEnderecoPorCep'
import { Cliente } from '../models/cliente'
export class ClienteServiceImpl implements ClienteService {
  private readonly httpRequest: HttpRequest
  private readonly validator: Validator | undefined

  constructor (httpRequest: HttpRequest, validator?: Validator) {
    this.validator = validator
    this.httpRequest = httpRequest
  }

  async getlist (params: GetParams): Promise<GetListClienteResponse> {
    let { filter, filterOptions, filterObject, token } = params
    const query = generateSearchQuery(filter, filterOptions, filterObject)

    const response = await this.httpRequest.get<GetListClienteResponse>({
      path: 'clientes',
      token,
      query
    })

    handleErrors(response?.error)
    return response?.data as GetListClienteResponse
  }

  async getById (params: GetParams): Promise<GetOneClienteResponse> {
    let { filter: id, token } = params

    const response = await this.httpRequest.get({
      path: `clientes/${id}`,
      token
    })

    handleErrors(response?.error)
    return response?.data as GetOneClienteResponse
  }

  async create (params: PostParams): Promise<Cliente> {
    let { body, token } = params
    // await this.validator?.validate(body)

    const response = await this.httpRequest.post<Cliente>({
      path: 'clientes',
      body,
      token
    })

    handleErrors(response?.error)
    return response?.data as Cliente
  }

  async getDadosReceitaPorCNPJ (params:GetParams): Promise<GetDadosClienteCNPJResponse> {
    const response = await this.httpRequest.get({
      url: 'https://www.receitaws.com.br/v1/',
      path: `cnpj/${params.filter}`,
      token: process.env.REACT_APP_API_CNPJ_TOKEN
    })

    handleErrors(response?.error)
    return response as GetDadosClienteCNPJResponse
  }

  async getEnderecoPorCep (params: GetParams): Promise<GetEnderecoPorCep> {
    const response = await this.httpRequest.get<GetEnderecoPorCep>({
      url: 'https://viacep.com.br/ws/',
      path: `${params.filter}/json/`
    })

    return response as unknown as GetEnderecoPorCep
  }
}
