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

    setActiveTab(0)
  }, [pathname, setActiveTab])

  return (
    <Container>
      <header>
        {/* tab fixa */}
        <Tab selected={activeTab === 0}>
          <span>{tabFixedTitle}</span>
        </Tab>
        {/* tab fixa */}
      </header>

      <TabContent>
        { activeTab === 0 && fixedContent }
      </TabContent>
    </Container>
  )
}
