import { PostParams } from '../../_interfaces'
import { AuthService } from '../interfaces'

interface LogarUseCaseParams {
  email: string
  password: string
}

export class Logar {
  private readonly authService: AuthService

  constructor (authService: AuthService) {
    this.authService = authService
  }

  async execute (logarUseCaseParams: LogarUseCaseParams): Promise< string| undefined> {
    const params: PostParams = {
      body: logarUseCaseParams
    }

    const login = await this.authService.login(params)
    return login?.token
  }
}
