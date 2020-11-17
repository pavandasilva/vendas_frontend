import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Nav, Tab } from 'react-bootstrap'
import capitalize from 'capitalize-pt-br'

import { FaTimes } from 'react-icons/fa'
import { useTabs } from '../../hooks'

interface TabsProps {
  fixedContent?: React.ReactNode
}

export const Tabs = ({ fixedContent }: TabsProps) => {
  const [tabFixedTitle, setTabFixedTitle] = useState('')
  const { activeTab, setActiveTab, tabs, removeTab } = useTabs()
  const { pathname } = useLocation()

  const handleCloseTabOnClick = useCallback((index: number) => {
    removeTab(index)
  }, [removeTab])

  useEffect(() => {
    if (pathname === '/') {
      setTabFixedTitle('Dashboard')
    } else {
      setTabFixedTitle(capitalize(pathname.split('/')[1]))
    }

    setActiveTab(-1)
  }, [pathname, setActiveTab])

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
            <>
              <Nav.Item key={`tab${index + 1}`.toString()} onClick={() => setActiveTab(index)}>
                <Nav.Link eventKey={index}>
                  { tab.title }
                </Nav.Link>
              </Nav.Item>

              <span className='close' onClick={() => handleCloseTabOnClick(index)}><FaTimes /></span>
            </>
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
