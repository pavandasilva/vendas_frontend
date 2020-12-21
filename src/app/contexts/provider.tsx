import React from 'react'
import { SideBarProvider, UsuarioProvider, TabsProvider, AtendimentoClienteProvider } from '.'
import { TabCadastroClienteProvider } from './tabCadastroClienteContext'
import { OrcamentoTabsProvider } from './tabsOrcamentoContext'

export const Providers: React.FC = ({ children }) => {
  return (
    <AtendimentoClienteProvider>
      <OrcamentoTabsProvider>
        <TabCadastroClienteProvider>
          <SideBarProvider>
            <UsuarioProvider>
              <TabsProvider>
                {children}
              </TabsProvider>
            </UsuarioProvider>
          </SideBarProvider>
        </TabCadastroClienteProvider>
      </OrcamentoTabsProvider>
    </AtendimentoClienteProvider>

  )
}
