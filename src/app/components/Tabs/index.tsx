import capitalize from 'capitalize-pt-br'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTabs } from '../../hooks/contexts'

import { Container, TabContent, Tab } from './styles'

interface TabsProps {
  fixedContent?: React.ReactNode,
  titleFixedContent: string
}

export const Tabs = ({ fixedContent, titleFixedContent }: TabsProps) => {
  const [tabFixedTitle, setTabFixedTitle] = useState('')
  const { activeTab, setActiveTab, tabs, removeTab } = useTabs()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      setTabFixedTitle('Dashboard')
    } else {
      setTabFixedTitle(capitalize(pathname.split('/')[1]))
    }

    setActiveTab(-1)
  }, [pathname, setActiveTab])

  return (
    <Container>
      <header>
        {/* tab fixa */}
        <Tab selected={activeTab === -1}>
          <span>{tabFixedTitle}</span>
        </Tab>
        {/* tab fixa */}

        { tabs?.map((tab, index) => (
          <Tab key={index} selected={activeTab === index}>
            <span>{tab.title}</span>
          </Tab>
        ))}

      </header>

      <TabContent>
        {/*  conteúdo da tab fixa */}
        { activeTab === -1 && fixedContent }
        {/*  conteúdo da tab fixa */}

        { tabs?.map((tab, index) => (
          // eslint-disable-next-line eqeqeq
          index == activeTab && tab.content
        ))}
      </TabContent>
    </Container>
  )
}
