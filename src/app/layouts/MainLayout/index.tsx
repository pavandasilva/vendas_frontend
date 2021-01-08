import React, { ReactNode } from 'react'
import { SideMenu, Header, Tabs } from '../../components'
import { useSideBar } from '../../contexts'
import { Container, Content } from './styles'

interface MainLayoutProps {
  title: string
  children: ReactNode
}

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  const { isVisible } = useSideBar()

  return (
    <Container >
      <SideMenu />
      <Content isVisible = {isVisible}>
        <Header />
        <Tabs titleFixedContent={title} fixedContent={children}/>
      </Content>
    </Container>
  )
}
