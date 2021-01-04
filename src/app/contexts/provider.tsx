import React from 'react'
import { SideBarProvider, UsuarioProvider, TabsProvider, OrcamentosProvider } from '.'
import { ModalProvider } from './modalContext'
import { TabCadastroClienteProvider } from './tabCadastroClienteContext'
import { AtendimentoTabsProvider } from './tabsAtendimentoContext'
import { OrcamentoTabsProvider } from './tabsOrcamentoContext'

export const Providers: React.FC = ({ children }) => {
  return (
    <ModalProvider>
      <AtendimentoTabsProvider>
        <OrcamentosProvider>
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
        </OrcamentosProvider>
      </AtendimentoTabsProvider>
    </ModalProvider>
  )
}
