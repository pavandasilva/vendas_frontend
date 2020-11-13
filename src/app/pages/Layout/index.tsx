import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import { AsideMenu } from '../../components/AsideMenu'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import { Tabs } from '../../components/Tabs'

interface LayoutProps {
  title: string
}

export const Layout: React.FC <LayoutProps> = ({ children, title }) => {
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
