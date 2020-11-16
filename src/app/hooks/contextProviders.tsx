import React from 'react'
import { UsuarioProvider, OrcamentoProvider, SideBarProvider, TabsProvider } from '.'

export const Providers: React.FC = ({ children }) => {
  return (
    <SideBarProvider>
      <UsuarioProvider>
        <OrcamentoProvider>
          <TabsProvider>
            {children}
          </TabsProvider>
        </OrcamentoProvider>
      </UsuarioProvider>
    </SideBarProvider>
  )
}
