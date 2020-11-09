import { PostParams } from '../../_interfaces'
import { AuthService } from '../interfaces'
import { Usuario } from '../models/usuario'

interface LogarUseCaseParams {
  email: string
  password: string
}

export class Logar {
  private readonly authService: AuthService

  constructor (authService: AuthService) {
    this.authService = authService
  }

  async execute (logarUseCaseParams: LogarUseCaseParams): Promise< Usuario| undefined> {
    const params: PostParams = {
      body: logarUseCaseParams
    }

    return await this.authService.login(params)
  }
}
