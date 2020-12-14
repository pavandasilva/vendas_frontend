import { handleErrors } from '../../../helpers/handleErrors'
import { PostParams, Validator } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { AuthService } from '../interfaces'

interface LoginResponse {
  token: string
}

export class AuthServiceImpl implements AuthService {
  private readonly validator: Validator
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest, validator: Validator) {
    this.validator = validator
    this.httpRequest = httpRequest
  }

  async login (params: PostParams): Promise<LoginResponse | undefined> {
    await this.validator?.validate(params.body)

    const response = await this.httpRequest.post<LoginResponse>({
      body: params.body,
      path: 'auth'
    })

    handleErrors(response.error)
    return response.data
  }
}
