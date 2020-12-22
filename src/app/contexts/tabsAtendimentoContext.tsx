import React, { createContext, ReactNode, useCallback, useState } from 'react'

type AtendimentoCurrentTab = 'geral' | 'pedidos' | 'financeiro' | 'pedidoEmAndamento'

type CurrentTabsType = {
  [clienteId: number]: AtendimentoCurrentTab
}

export interface AtendimentoTabsContextProps {
  currentTabs: CurrentTabsType
  setCurrentTab: (clienteId: number, currentTab: AtendimentoCurrentTab) => void
}

interface AtendimentoTabsProviderProps {
  children: ReactNode
}

export const AtendimentoTabsContext = createContext<AtendimentoTabsContextProps>({} as AtendimentoTabsContextProps)

export const AtendimentoTabsProvider = ({ children }: AtendimentoTabsProviderProps) => {
  const [tabs, setTabs] = useState<CurrentTabsType>({} as CurrentTabsType)

  const setCurrentTab = useCallback((clienteId: number, currentTab: AtendimentoCurrentTab) => {
    setTabs(oldState => ({ ...oldState, [clienteId]: currentTab }))
  }, [])

  return (
    <AtendimentoTabsContext.Provider value={{
      setCurrentTab,
      currentTabs: tabs

    }}>
      { children }
    </AtendimentoTabsContext.Provider>
  )
}
