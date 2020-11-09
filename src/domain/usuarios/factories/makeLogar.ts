import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { AuthServiceImpl } from '../services/authService'
import { Logar } from '../useCases/logar'
import { LoginValidator } from '../validators/loginValidator'

export function makeLogar (): Logar {
  const httpRequest = new HttpRequestImpl()
  const validator = new LoginValidator()
  const authService = new AuthServiceImpl(httpRequest, validator)
  return new Logar(authService)
}
