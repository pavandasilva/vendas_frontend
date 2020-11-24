import * as yup from 'yup'

export const schema = yup.object().shape({
  razao_social: yup.string().required('razão social é um campo obrigatório'),
  nome_fantasia: yup.string().required('nome fantasia é um campo obrigatório'),
  email: yup.string().email().required('email é um campo obrigatório'),
  email_nfe: yup.string().email('email nota fiscal é um campo obrigatório'),
  email_nfe2: yup.string().email('email nota fiscal2 é um campo obrigatório'),
  cnpj: yup.string().required(),
  ie: yup.string(),
  cep: yup.string(),
  endereco: yup.string(),
  numero: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  regiao: yup.string(),
  uf: yup.string().length(2),
  is_cliente_final: yup.string().length(1),
  is_orgao_estadual: yup.string().length(1),
  is_revenda: yup.string().length(1)
})
