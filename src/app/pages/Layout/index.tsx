import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import { AsideMenu } from '../../components/AsideMenu'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

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

          <div className="m-3">

            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link eventKey="link-2">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" bsPrefix="nav-link-add">
                  <FaPlusCircle></FaPlusCircle>
                </Nav.Link>
              </Nav.Item>

            </Nav>

            <div className="page-header">
              <div className="container-fluid d-sm-flex justify-content-between">
                <h1>{title}</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="https://intranet.route66.com.br">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </nav>
              </div>
            </div>

            {children}

          </div>

          <Footer />
        </div>

      </div>
    </Container>
  )
}
