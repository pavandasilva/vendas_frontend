import React from 'react'
import { SideBarProvider, UsuarioProvider, OrcamentoProvider, TabsProvider, ClienteDataCadastroProvider } from '.'

export const Providers: React.FC = ({ children }) => {
  return (
    <ClienteDataCadastroProvider>
      <SideBarProvider>
        <UsuarioProvider>
          <OrcamentoProvider>
            <TabsProvider>
              {children}
            </TabsProvider>
          </OrcamentoProvider>
        </UsuarioProvider>
      </SideBarProvider>
    </ClienteDataCadastroProvider>

  )
}
