import React, { createContext, useCallback, useState } from 'react'
import { ItemOrcamento } from '../../domain/pedidos/models'

export interface ItemOrcamentoContextProps {
  data?: ItemOrcamento
  setData(itemOrcamento: ItemOrcamento): void
  resetData() : void
}

const initialValues: ItemOrcamento = {

}

export const ItemOrcamentoContext = createContext<ItemOrcamentoContextProps>({} as ItemOrcamentoContextProps)

export const ItemOrcamentoProvider: React.FC = ({ children }) => {
  const [itemOrcamento, setItemOrcamento] = useState<ItemOrcamento>(initialValues)

  const resetData = useCallback(() => {
    setItemOrcamento(initialValues)
  }, [])

  return (
    <ItemOrcamentoContext.Provider value={{ data: itemOrcamento, setData: setItemOrcamento, resetData }} >
      {children}
    </ItemOrcamentoContext.Provider>
  )
}
