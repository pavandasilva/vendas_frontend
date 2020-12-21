import { useContext } from 'react'
import { OrcamentoTabsContext, OrcamentoTabsContextProps } from '../contexts'

export const useOrcamentoTabs = (): OrcamentoTabsContextProps => {
  const context = useContext(OrcamentoTabsContext)

  if (!context) {
    throw new Error('useOrcamentoTabs deve ser utilizado com OrcamentoTabsProvider')
  }

  return context
}
