import { ModelBase } from '../../_interfaces'

export interface Cliente extends ModelBase {
  id?: number | string
  cnpj?: string
  ie?: string
  razao_social?: string
  nome_fantasia?: string
  email?: string
  email_nfe?: string
  email_nfe2?: string
  endereco?: string
  complemento?: string
  numero?: string
  bairro?: string
  regiao?: string
  cidade?: string
  cep?: string
  uf?: string
  is_orgao_estadual?: string
  is_cliente_final?: 's' | 'n'
  is_revenda?: 's' | 'n'
  is_contribuinte?: 's' | 'n'
  is_nao_contribuinte?: 's' | 'n'
  is_simples_nacional?: 's' | 'n'
  is_fornecedor?: 's' | 'n'
  is_transportadora?: 's' | 'n'
  is_revenda_cliente?: 's' | 'n'
  is_representante_cliente?: 's' | 'n'
  classe?: 'a' | 'b' | 'c'
  grupo_id?: number
  status?: 'bloqueado' | 'liberado' | 'inativo' | 'internet' | 'off'
}
