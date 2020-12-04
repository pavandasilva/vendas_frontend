import React, { ReactNode } from 'react'
import { SideMenu, NavBar } from '../../components'
import { Container, Content } from './styles'

interface MainLayoutProps {
  title: string
  children: ReactNode
}

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <Container >
      <SideMenu />
      <Content>
        <NavBar />
        <div>
          { children }
        </div>
      </Content>
    </Container>
  )
}
