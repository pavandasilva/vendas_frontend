export interface Endereco {
  cep: string
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,
  numero: string,
  fantasia?: string,
  nome: string,
  email: string,
  erro?: string,
}

export interface GetEnderecoPorCep {
  data: Endereco
}
