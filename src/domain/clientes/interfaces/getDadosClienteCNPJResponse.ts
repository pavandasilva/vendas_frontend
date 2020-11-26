import { GetResponseDefault } from '../../_interfaces'

interface Endereco {
  bairro: string,
  cep: string,
  complemento: string,
  email: string,
  logradouro: string,
  municipio: string,
  nome: string,
  numero: string,
  uf: string,
  fantasia: string
}

export interface GetDadosClienteCNPJResponse extends GetResponseDefault {
  data: Endereco
}
