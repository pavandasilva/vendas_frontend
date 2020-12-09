import { useContext } from 'react'
import { CadastroClienteContext, CadastroClienteContextProps } from '../contexts'

export const useCadastroCliente = (): CadastroClienteContextProps => {
  const context = useContext(CadastroClienteContext)

  if (!context) {
    throw new Error('useCadastroCliente deve ser usado com dadastroClienteProvider')
  }

  return context
}
