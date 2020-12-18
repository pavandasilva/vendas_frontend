import React, { createContext, ReactNode, useCallback, useState } from 'react'

type AtendimentoCurrentTab = 'geral' | 'pedidos' | 'financeiro' | 'pedidoEmAndamento'

type CurrentTabs = {
  [index: number]: AtendimentoCurrentTab
}

export interface AtendimentoClienteContextProps {
  currentTabs: CurrentTabs
  setCurrentTab: (clienteId: number, currentTab: AtendimentoCurrentTab) => void
}
interface AtendimentoClienteProviderProps {
  children: ReactNode
}

export const AtendimentoClienteContext = createContext<AtendimentoClienteContextProps>({} as AtendimentoClienteContextProps)

export const AtendimentoClienteProvider = ({ children }: AtendimentoClienteProviderProps) => {
  const [state, setState] = useState<CurrentTabs>({} as CurrentTabs)

  const setCurrentTab = useCallback((clienteId: number, currentTab: AtendimentoCurrentTab) => {
    setState(oldState => ({ ...oldState, [clienteId]: currentTab }))
  }, [])

  return (
    <AtendimentoClienteContext.Provider value={{
      currentTabs: state,
      setCurrentTab
    }}>
      { children }
    </AtendimentoClienteContext.Provider>
  )
}
