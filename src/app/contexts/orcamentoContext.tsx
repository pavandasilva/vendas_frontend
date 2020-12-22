import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { ItemOrcamento } from '../../domain/clientes/models/itemOrcamento'

type Orcamentos = {
  [clienteId: number]: ItemOrcamento[]
}
export interface OrcamentoContextProps {
  orcamentos: Orcamentos
  setOrcamento: (clienteId: number, itens: ItemOrcamento[]) => void
}
interface OrcamentoProviderProps {
  children: ReactNode
}

export const OrcamentoContext = createContext<OrcamentoContextProps>({} as OrcamentoContextProps)

export const OrcamentosProvider = ({ children }: OrcamentoProviderProps) => {
  const [orcamentos, setOrcamentos] = useState<Orcamentos>({} as Orcamentos)

  const setOrcamento = useCallback((clienteId: number, itens: ItemOrcamento[]) => {
    setOrcamentos(oldState => ({ ...oldState, [clienteId]: itens }))
  }, [])

  return (
    <OrcamentoContext.Provider value={{
      orcamentos,
      setOrcamento
    }}>
      { children }
    </OrcamentoContext.Provider>
  )
}
