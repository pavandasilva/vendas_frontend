import { useContext } from 'react'
import { OrcamentoContext, OrcamentoContextProps } from '../contexts'

export const useOrcamentos = (): OrcamentoContextProps => {
  const context = useContext(OrcamentoContext)

  if (!context) {
    throw new Error('useOrcamentos deve ser usado com OrcamentosProvider')
  }

  return context
}
