import React, { ReactNode } from 'react'
import { SideMenu, Header, Tabs } from '../../components'
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
        <Header />
        <Tabs titleFixedContent={title} fixedContent={children}/>
      </Content>
    </Container>
  )
}
