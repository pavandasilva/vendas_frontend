import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Pedido } from '../../domain/clientes/models/pedido'

type AtendimentoCurrentTab = 'geral' | 'pedidos' | 'financeiro' | 'pedidoEmAndamento'

type CurrentTabs = {
  [clienteId: number]: AtendimentoCurrentTab
}

type Pedidos = {
  [clienteId: number]: Pedido
}
export interface AtendimentoClienteContextProps {
  currentTabs: CurrentTabs
  setCurrentTab: (clienteId: number, currentTab: AtendimentoCurrentTab) => void
  pedidos: Pedidos
  setPedido: (clienteId: number, pedido: Pedido) => void
}
interface AtendimentoClienteProviderProps {
  children: ReactNode
}

export const AtendimentoClienteContext = createContext<AtendimentoClienteContextProps>({} as AtendimentoClienteContextProps)

export const AtendimentoClienteProvider = ({ children }: AtendimentoClienteProviderProps) => {
  const [tabs, setTabs] = useState<CurrentTabs>({} as CurrentTabs)
  const [pedidos, setPedidos] = useState<Pedidos>({} as Pedidos)

  const setCurrentTab = useCallback((clienteId: number, currentTab: AtendimentoCurrentTab) => {
    setTabs(oldState => ({ ...oldState, [clienteId]: currentTab }))
  }, [])

  const setPedido = useCallback((clienteId: number, pedido: Pedido) => {
    setPedidos(oldState => ({ ...oldState, [clienteId]: pedido }))
  }, [])

  return (
    <AtendimentoClienteContext.Provider value={{
      currentTabs: tabs,
      setCurrentTab,
      pedidos,
      setPedido
    }}>
      { children }
    </AtendimentoClienteContext.Provider>
  )
}
