import { useContext } from 'react'
import { AtendimentoTabsContext, AtendimentoTabsContextProps } from '../contexts/tabsAtendimentoContext'

export const useAtendimentoTabs = (): AtendimentoTabsContextProps => {
  const context = useContext(AtendimentoTabsContext)

  if (!context) {
    throw new Error('useAtendimentoTabs deve ser usado com AtendimentoTabsProvider')
  }

  return context
}
