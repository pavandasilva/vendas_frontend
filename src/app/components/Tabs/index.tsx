import React, { useState, useEffect, useContext } from 'react'
import { TabsContext } from '../../context'
import capitalize from 'capitalize-pt-br'
import { useLocation } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'

interface TabsProps {
  fixedContent?: React.ReactNode
}

export const Tabs = ({ fixedContent }: TabsProps) => {
  const [tabFixedTitle, setTabFixedTitle] = useState('')
  const { activeTab, setActiveTab, tabs, removeTab } = useContext(TabsContext)
  const { pathname } = useLocation()

  const handleCloseTabOnClick = (index: number) => {
    removeTab(index)
  }

  useEffect(() => {
    if (pathname === '/') {
      setTabFixedTitle('Dashboard')
    } else {
      setTabFixedTitle(capitalize(pathname.split('/')[1]))
    }
  }, [pathname])

  return (
    <div className="m-3">
      <Tab.Container activeKey={activeTab} defaultActiveKey={-1}>
        <Nav variant="tabs">
          {/*   tab fixa */}
          <Nav.Item key={-1} onClick={() => setActiveTab(-1)}>
            <Nav.Link eventKey={-1}>
              { tabFixedTitle }
            </Nav.Link>
          </Nav.Item>
          {/* tab fixa */}

          { tabs?.map((tab, index) => (
            <Nav.Item key={`tab${index + 1}`.toString()} onClick={() => setActiveTab(index)}>
              <Nav.Link eventKey={index}>
                <span onClick={() => handleCloseTabOnClick(index)}>x</span>
                { tab.title }
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {/*  conteudo da aba fixa */}
          <Tab.Pane key={-1} eventKey={-1}>
            { fixedContent }
          </Tab.Pane>
          {/*  conteudo da aba fixa */}
          <Tab.Content>
            { tabs?.map((tab, index) => (
              <Tab.Pane key={`contentTab${index}`} eventKey={index} >
                { tab.content }
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}
