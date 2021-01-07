import React from 'react'
import { SideBarProvider, UsuarioProvider, TabsProvider } from '.'
import { AtendimentosProvider } from './atendimentoContext'
import { ModalProvider } from './modalContext'
import { TabCadastroClienteProvider } from './tabCadastroClienteContext'
import { AtendimentoTabsProvider } from './tabsAtendimentoContext'
import { OrcamentoTabsProvider } from './tabsOrcamentoContext'

export const Providers: React.FC = ({ children }) => {
  return (
    <ModalProvider>
      <AtendimentosProvider>
        <AtendimentoTabsProvider>
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
        </AtendimentoTabsProvider>
      </AtendimentosProvider>
    </ModalProvider>
  )
}
