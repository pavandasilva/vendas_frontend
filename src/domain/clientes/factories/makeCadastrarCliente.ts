import { HttpRequestImpl } from '../../../infra/http/httpRequest'
import { SchemaValidator } from '../../../infra/validator/schemaValidator'
import { ClienteServiceImpl } from '../services/clienteService'
import { CadastrarCliente } from '../useCases/cadastrarCliente'
import { schema } from '../validators/schema'

export function makeCadastrarCliente (): CadastrarCliente {
  const httpRequest = new HttpRequestImpl()
  const schemaValidator = new SchemaValidator(schema)
  const clienteService = new ClienteServiceImpl(httpRequest, schemaValidator)

  return new CadastrarCliente(clienteService)
}
