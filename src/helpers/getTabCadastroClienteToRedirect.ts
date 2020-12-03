import { CurrentTab } from '../app/hooks/contexts/tabCadastroClienteContext'

export const getTabCadastroClienteToRedirect = (error: any) : CurrentTab => {
  console.log('getTabCadastroClienteToRedirect', error)

  if (
    !!error?.cnpj ||
    !!error?.ie ||
    !!error?.razao_social ||
    !!error?.nome_fantasia ||
    !!error?.email ||
    !!error?.email_nfe ||
    !!error.email_nfe2
  ) {
    return 'dados'
  } else if (
    !!error.cep ||
    !!error?.endereco ||
    !!error?.numero ||
    !!error?.uf ||
    !!error?.cidade ||
    !!error?.bairro ||
    !!error?.complemento ||
    !!error?.regiao
  ) {
    return 'endereco'
  } else {
    return 'contatos'
  }
}
