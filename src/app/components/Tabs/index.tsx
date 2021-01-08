import capitalize from 'capitalize-pt-br'
import React, { useCallback, useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useAtendimentos, useTabs } from '../../hooks'
import { Container, TabContent, Tab, Close } from './styles'

interface TabsProps {
  fixedContent?: React.ReactNode,
  titleFixedContent: string
}

export const Tabs = ({ fixedContent, titleFixedContent }: TabsProps) => {
  const [tabFixedTitle, setTabFixedTitle] = useState('')
  const { activeTab, setActiveTab, tabs, removeTab } = useTabs()
  const { removeAtendimento } = useAtendimentos()

  useEffect(() => {
    setTabFixedTitle(titleFixedContent)
  }, [setActiveTab, titleFixedContent])

  const handleCloseOnClick = useCallback((index: number, clienteId: number) => {
    removeTab(index)
    removeAtendimento(clienteId)
  }, [removeAtendimento, removeTab])

  return (
    <Container>
      <header>
        {/* tab fixa */}
        <Tab key='fixed' selected={activeTab === -1} onClick={() => setActiveTab(-1)}>
          <p>{tabFixedTitle}</p>
        </Tab>
        {/* tab fixa */}

        { tabs?.map((tab, index) => (
          <Tab key={index} selected={activeTab === index} onClick={() => setActiveTab(index)}>
            <Close onClick={() => handleCloseOnClick(index, tab.clienteId)}>
              <FiX />
            </Close>
            <p>{capitalize(tab.title)}</p>
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
