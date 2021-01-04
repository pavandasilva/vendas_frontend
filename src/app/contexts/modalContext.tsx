import React, { createContext, useCallback, useState } from 'react'
import { ItemOrcamento } from '../../domain/clientes/models/itemOrcamento'

export interface ModalContextProps {
  data?: any
  setData(itemOrcamento: ItemOrcamento): void
  resetData() : void
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

export const ModalProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({})

  const resetData = useCallback(() => {
    setData({})
  }, [])

  return (
    <ModalContext.Provider value={{ data, setData, resetData }} >
      {children}
    </ModalContext.Provider>
  )
}
