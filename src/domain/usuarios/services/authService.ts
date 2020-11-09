import { AppError } from '../../../helpers/appError'
import { PostParams, Validator } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { AuthService } from '../interfaces'
import { Usuario } from '../models/usuario'

export class AuthServiceImpl implements AuthService {
  private readonly validator: Validator
  private readonly httpRequest: HttpRequest

  constructor (httpRequest: HttpRequest, validator: Validator) {
    this.validator = validator
    this.httpRequest = httpRequest
  }

  async login (params: PostParams): Promise<Usuario | undefined> {
    try {
      await this.validator.validate(params.body)
    } catch (error) {
      throw new AppError({
        message: error,
        type: 'validate'
      })
    }

    try {
      return await this.httpRequest.post<Usuario>({
        body: params.body,
        path: 'auth'
      })
    } catch (error) {
      throw new AppError({
        message: error,
        type: 'service'
      })
    }
  }

  async logout (): Promise<boolean> {
    return true
  }
}
