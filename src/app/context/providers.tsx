import React from 'react'
import { UsuarioProvider, OrcamentoProvider, SideBarProvider } from '.'

export const Providers: React.FC = ({ children }) => {
  return (
    <SideBarProvider>
      <UsuarioProvider>
        <OrcamentoProvider>
          {children}
        </OrcamentoProvider>
      </UsuarioProvider>
    </SideBarProvider>
  )
}
