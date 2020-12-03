import * as yup from 'yup'

export const schema = yup.object().shape({
  razao_social: yup.string().required('razão social é um campo obrigatório'),
  nome_fantasia: yup.string().required('nome fantasia é um campo obrigatório'),
  email: yup.string().email().required('email é um campo obrigatório'),
  email_nfe: yup.string().email('email nota fiscal é um campo obrigatório').required(),
  email_nfe2: yup.string().email('email nota fiscal2 é um campo obrigatório').required('email nota fiscal 2 é inválido'),
  cnpj: yup.string().required().min(11).max(14),
  ie: yup.string().required('inscrição estadual é um campo obrigatório'),
  cep: yup.string().required().length(8),
  endereco: yup.string().required(),
  numero: yup.string().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
  regiao: yup.string().required(),
  uf: yup.string().required().length(2),
  is_cliente_final: yup.string().length(1).required(),
  is_orgao_estadual: yup.string().length(1).required(),
  is_revenda: yup.string().length(1).required(),
  contatos: yup.array()
    .of(
      yup.object().shape({
        id: yup.string(),
        nome: yup.string(),
        email: yup.string(),
        fiscal: yup.mixed().oneOf(['s', 'n']),
        comercial: yup.mixed().oneOf(['s', 'n']),
        financeiro: yup.mixed().oneOf(['s', 'n']),
        status: yup.mixed().oneOf(['ativo', 'inativo']),
        telefones: yup.array()
          .of(
            yup.object().shape({
              ddd: yup.string(),
              numero: yup.string(),
              ramal: yup.string(),
              whatsapp: yup.mixed().oneOf(['s', 'n'])
            })
          )
      })
    )
})
