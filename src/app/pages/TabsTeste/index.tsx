import React, { useState } from 'react'
import { Nav, Tab, Tabs } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import './styles.scss'

interface TabProps {
  title: string
  element: JSX.Element
  id: number
  selected: boolean
  draggable: boolean
  excludable: boolean
}

const mainTab: TabProps = {
  title: 'Clientes fidelizados',
  element: <div><h1>testes</h1></div>,
  id: 1,
  draggable: false,
  excludable: false,
  selected: true
}

const testeTable: TabProps = {
  title: 'Clientes',
  element: <div><h1>testes</h1></div>,
  id: 0,
  draggable: false,
  excludable: false,
  selected: false
}

export const RoutesTabsTeste: React.FC = () => {
  return <>

  </>
}

export const TabsTeste: React.FC = () => {
  const [tabs, setTabs] = useState([mainTab, testeTable])

  const handleTabOnSelect = (tabId: number) => {
    setTabs(tabs => {
      const newState = tabs.map(tab => {
        if (tab.id === tabId) {
          tab.selected = true
        } else {
          tab.selected = false
        }

        return tab
      })

      return newState
    })
  }

  return (
    <div>
      <Tab.Container defaultActiveKey={1}>
        <Nav className='nav-tabs'>
          { tabs.map(tab => (
            <Nav.Item className={tab.selected ? 'teste' : ''} key={tab.id.toString()}>
              <Nav.Link className={tab.selected ? 'teste' : ''} eventKey={tab.id} onSelect={() => handleTabOnSelect(tab.id)}>
                {tab.title}
              </Nav.Link>
              {tab.excludable && <span>x</span>}
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          { tabs.map(tab => (
            <Tab.Pane key={`tabpane${tab.id}`} eventKey={tab.id}>
              {tab.element}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>

  )
}
