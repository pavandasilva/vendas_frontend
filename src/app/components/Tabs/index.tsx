import React, { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

interface TabsProps {
  fixedContent?: React.ReactNode
}

export const Tabs = ({ fixedContent }: TabsProps) => {
  return (
    <div className="m-3">
      <Tab.Container defaultActiveKey='fixed'>
        <Nav variant="tabs">
          <Nav.Item key='fixed'>
            <Nav.Link eventKey='fixed'>
              teste
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="link-1" bsPrefix="nav-link-add">
              <FaPlusCircle></FaPlusCircle>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          {/*  conteudo da aba fixa */}
          <Tab.Pane key='fixed'eventKey='fixed'>
            { fixedContent }
          </Tab.Pane>
          {/*  conteudo da aba fixa */}
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}
