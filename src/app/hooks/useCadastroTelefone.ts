import { useContext } from 'react'
import { CadastroTelefoneContext, CadastroTelefoneContextProps } from '../contexts'

export const useCadastroTelefone = (): CadastroTelefoneContextProps => {
  const context = useContext(CadastroTelefoneContext)

  if (!context) {
    throw new Error('useCadastroTelefone deve ser usado com CadastroTelefoneProvider')
  }

  return context
}
