import { AppError } from '../../../helpers/appError'
import { handleErrors } from '../../../helpers/handleErrors'
import { PostParams, RouteController, Validator, AlertController } from '../../_interfaces'
import { HttpRequest } from '../../_interfaces/httpRequest'
import { AuthService } from '../interfaces'

interface LoginResponse {
  token: string
}

export class AuthServiceImpl implements AuthService {
  private readonly validator: Validator
  private readonly httpRequest: HttpRequest
  private readonly routeController: RouteController
  private readonly alertController: AlertController

  constructor (httpRequest: HttpRequest, routeController: RouteController, alertController: AlertController, validator: Validator) {
    this.validator = validator
    this.httpRequest = httpRequest
    this.routeController = routeController
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

    handleErrors(this.routeController, this.alertController, response.error)

    if (response.status === 200) {
      this.routeController.goTo('/')
    }

    return response.data
  }

  async logout (): Promise<boolean> {
    return true
  }
}
