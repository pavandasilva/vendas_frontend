import React, { useState, useEffect, useContext, useCallback } from 'react'
import { TabsContext } from '../../context'
import capitalize from 'capitalize-pt-br'
import { useLocation } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

interface TabsProps {
  fixedContent?: React.ReactNode
}

export const Tabs = ({ fixedContent }: TabsProps) => {
  const [tabFixedTitle, setTabFixedTitle] = useState('')
  const { activeTab, setActiveTab, tabs } = useContext(TabsContext)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      setTabFixedTitle('Dashboard')
    } else {
      setTabFixedTitle(capitalize(pathname.split('/')[1]))
    }
  }, [pathname])

  return (
    <div className="m-3">
      <Tab.Container defaultActiveKey={0} activeKey={activeTab}>
        <Nav variant="tabs">
          {/*   tab fixa */}
          <Nav.Item key={0} onClick={() => setActiveTab(0)}>
            <Nav.Link eventKey={0}>
              { tabFixedTitle}
            </Nav.Link>
          </Nav.Item>
          {/* tab fixa */}

          { tabs?.map(tab => (
            <Nav.Item key={tab.index} onClick={() => setActiveTab(tab.index)}>
              <Nav.Link eventKey={tab.index}>
                { tab.title }
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {/*  conteudo da aba fixa */}
          <Tab.Pane key={0} eventKey={0}>
            { fixedContent }
          </Tab.Pane>
          {/*  conteudo da aba fixa */}

          <Tab.Content>
            { tabs?.map(tab => (
              <Tab.Pane key={tab.index} eventKey={tab.index}>
                {tab.index}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}
