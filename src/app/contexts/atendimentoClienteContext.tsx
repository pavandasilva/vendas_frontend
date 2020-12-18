import React, { createContext, ReactNode, useState } from 'react'

type AtendimentoCurrentTab = 'geral' | 'pedidos' | 'financeiro' | 'pedidoEmAndamento'

export interface AtendimentoClienteContextProps {
  currentTab: AtendimentoCurrentTab,
  setCurrentTab(currentTab: AtendimentoCurrentTab): void
}

interface AtendimentoClienteProviderProps {
  children: ReactNode
}

export const AtendimentoClienteContext = createContext<AtendimentoClienteContextProps>({} as AtendimentoClienteContextProps)

export const AtendimentoClienteProvider = ({ children }: AtendimentoClienteProviderProps) => {
  const [currentTab, setCurrentTab] = useState<AtendimentoCurrentTab>('geral')

  return (
    <AtendimentoClienteContext.Provider value={{
      currentTab,
      setCurrentTab
    }}>
      { children }
    </AtendimentoClienteContext.Provider>
  )
}
