import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { SchemaValidator } from '../../../infra/validator/schemaValidator'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerClientePorId } from '../useCases'
import { schema } from '../validators/schema'

export function makeTrazerClientePorId (): TrazerClientePorId {
  const httpRequest = new HttpRequestImpl()
  const schemaValidator = new SchemaValidator(schema)
  const clienteService = new ClienteServiceImpl(httpRequest, schemaValidator)

  return new TrazerClientePorId(clienteService)
}
