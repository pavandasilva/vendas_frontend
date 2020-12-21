import { generateSearchQuery } from '../../../helpers'
import { GetParams } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { ProdutoService, GetProdutosListResponse } from '../interfaces'

export class ProdutoServiceImpl implements ProdutoService {
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest) {
    this.httpRequest = httpRequest
  }

  async getlist (params: GetParams): Promise<GetProdutosListResponse> {
    let { filter, filterOptions, token } = params
    const query = generateSearchQuery(filter, filterOptions)

    const response = await this.httpRequest.get({
      path: 'produtos',
      token,
      query
    })

    return response?.data as GetProdutosListResponse
  }
}
