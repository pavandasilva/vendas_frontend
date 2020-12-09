import React from 'react'
import { SideBarProvider, UsuarioProvider, TabsProvider } from '.'
import { TabCadastroClienteProvider } from './tabCadastroClienteContext'

export const Providers: React.FC = ({ children }) => {
  return (
    <TabCadastroClienteProvider>
      <SideBarProvider>
        <UsuarioProvider>
          <TabsProvider>
            {children}
          </TabsProvider>
        </UsuarioProvider>
      </SideBarProvider>
    </TabCadastroClienteProvider>

  )
}
