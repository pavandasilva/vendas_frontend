import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { SchemaValidator } from '../../../infra/validator/schemaValidator'
import { AuthServiceImpl } from '../services/authService'
import { Logar } from '../useCases/logar'
import { schema } from '../validators/schema'

export function makeLogar (): Logar {
  const httpRequest = new HttpRequestImpl()
  const schemaValidator = new SchemaValidator(schema)
  const authService = new AuthServiceImpl(httpRequest, schemaValidator)
  return new Logar(authService)
}
