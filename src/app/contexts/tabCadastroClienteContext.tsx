import React, { createContext, useState } from 'react'

export type CurrentTab = 'dados' | 'endereco' | 'contatos'

export const TabCadastroClienteContext = createContext<[CurrentTab, React.Dispatch<React.SetStateAction<CurrentTab>>]>([] as unknown as [CurrentTab, React.Dispatch<React.SetStateAction<CurrentTab>>])

export const TabCadastroClienteProvider: React.FC = ({ children }) => {
  const state = useState('dados' as CurrentTab)

  return (
    <TabCadastroClienteContext.Provider value={state} >
      {children}
    </TabCadastroClienteContext.Provider>
  )
}
