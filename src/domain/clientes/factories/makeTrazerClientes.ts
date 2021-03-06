import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { SchemaValidator } from '../../../infra/validator/schemaValidator'
import { ClienteServiceImpl } from '../services/clienteService'
import { TrazerClientes } from '../useCases'
import { schema } from '../validators/schema'

export function makeTrazerClientes (): TrazerClientes {
  const httpRequest = new HttpRequestImpl()
  const schemaValidator = new SchemaValidator(schema)
  const clienteService = new ClienteServiceImpl(httpRequest, schemaValidator)

  return new TrazerClientes(clienteService)
}
