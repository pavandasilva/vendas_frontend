import { useContext } from 'react'
import { AtendimentoContext, AtendimentoContextProps } from '../contexts'

export const useAtendimentos = (): AtendimentoContextProps => {
  const context = useContext(AtendimentoContext)

  if (!context) {
    throw new Error('useAtendimentos deve ser usado com AtendimentosProvider')
  }

  return context
}
