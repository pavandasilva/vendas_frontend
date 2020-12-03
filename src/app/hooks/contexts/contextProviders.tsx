import React from 'react'
import { SideBarProvider, UsuarioProvider, OrcamentoProvider, TabsProvider, ClienteDataCadastroProvider } from '.'
import { TabCadastroClienteProvider } from './tabCadastroClienteContext'

export const Providers: React.FC = ({ children }) => {
  return (
    <ClienteDataCadastroProvider>
      <TabCadastroClienteProvider>
        <SideBarProvider>
          <UsuarioProvider>
            <OrcamentoProvider>
              <TabsProvider>
                {children}
              </TabsProvider>
            </OrcamentoProvider>
          </UsuarioProvider>
        </SideBarProvider>
      </TabCadastroClienteProvider>
    </ClienteDataCadastroProvider>

  )
}
