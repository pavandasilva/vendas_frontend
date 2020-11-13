import React from 'react'
import { Container } from 'react-bootstrap'
import { AsideMenu } from '../../components/AsideMenu'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import { Tabs } from '../../components/Tabs'

interface LayoutProps {
  title: string
}

export const Layout: React.FC <LayoutProps> = ({ children }) => {
  return (
    <Container fluid>
      <div id="main">
        <AsideMenu />
        <div id="wrapper">
          <Navbar />
          <Tabs fixedContent={children} />
          <Footer />
        </div>
      </div>
    </Container>
  )
}
