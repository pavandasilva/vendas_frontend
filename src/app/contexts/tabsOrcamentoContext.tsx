import React, { createContext, ReactNode, useCallback, useState } from 'react'

export type OrcamentoTabsType = 'dadosGerais' | 'produtos' | 'resumo'

type CurrentTabs = {
  [clienteId: number]: OrcamentoTabsType
}

export interface OrcamentoTabsContextProps {
  currentTabs: CurrentTabs
  setCurrentTab: (clienteId: number, currentTab: OrcamentoTabsType) => void
}
interface OrcamentoTabsProviderProps {
  children: ReactNode
}

export const OrcamentoTabsContext = createContext<OrcamentoTabsContextProps>({} as OrcamentoTabsContextProps)

export const OrcamentoTabsProvider = ({ children }: OrcamentoTabsProviderProps) => {
  const [tabs, setTabs] = useState<CurrentTabs>({} as CurrentTabs)

  const setCurrentTab = useCallback((clienteId: number, currentTab: OrcamentoTabsType) => {
    setTabs(oldState => ({ ...oldState, [clienteId]: currentTab }))
  }, [])

  return (
    <OrcamentoTabsContext.Provider value={{
      currentTabs: tabs,
      setCurrentTab
    }}>
      { children }
    </OrcamentoTabsContext.Provider>
  )
}
