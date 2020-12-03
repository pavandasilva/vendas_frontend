import React, { createContext, useContext, useState } from 'react'

export type CurrentTab = 'dados' | 'endereco' | 'contatos'

const TabCadastroClienteContext = createContext<[CurrentTab, React.Dispatch<React.SetStateAction<CurrentTab>>]>([] as unknown as [CurrentTab, React.Dispatch<React.SetStateAction<CurrentTab>>])

export const useTabCadastroCliente = (): [CurrentTab, React.Dispatch<React.SetStateAction<CurrentTab>>] => {
  const context = useContext(TabCadastroClienteContext)

  if (!context) {
    throw new Error('useTabCadastroClient deve ser usado com TabCadastroClienteContext')
  }

  return context
}

export const TabCadastroClienteProvider: React.FC = ({ children }) => {
  const state = useState('dados' as CurrentTab)

  return (
    <TabCadastroClienteContext.Provider value={state} >
      {children}
    </TabCadastroClienteContext.Provider>
  )
}
