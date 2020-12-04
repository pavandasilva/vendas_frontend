import { AppError } from '../../../helpers/appError'
import { handleErrors } from '../../../helpers/handleErrors'
import { PostParams, Validator, AlertController } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { AuthService } from '../interfaces'

interface LoginResponse {
  token: string
}

export class AuthServiceImpl implements AuthService {
  private readonly validator: Validator
  private readonly httpRequest: HttpRequest
  private readonly alertController: AlertController

  constructor (httpRequest: HttpRequest, alertController: AlertController, validator: Validator) {
    this.validator = validator
    this.httpRequest = httpRequest
    this.alertController = alertController
  }

  async login (params: PostParams): Promise<LoginResponse | undefined> {
    try {
      await this.validator.validate(params.body)
    } catch (error) {
      throw new AppError({
        message: error,
        type: 'validate'
      })
    }

    const response = await this.httpRequest.post<LoginResponse>({
      body: params.body,
      path: 'auth'
    })

    handleErrors(response.error)
    return response.data
  }
}
