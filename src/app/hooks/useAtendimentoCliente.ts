import { useContext } from 'react'
import { AtendimentoClienteContext, AtendimentoClienteContextProps } from '../contexts/atendimentoClienteContext'

export const useAtendimentoCliente = (): AtendimentoClienteContextProps => {
  const context = useContext(AtendimentoClienteContext)

  if (!context) {
    throw new Error('useAtendimentoCliente deve ser usado com AtendimentoClienteProvider')
  }

  return context
}
