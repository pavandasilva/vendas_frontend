import React, { createContext, useCallback, useState, useContext } from 'react'

interface Tab {
  title: string,
  index: number,
  content: React.ReactNode
}

interface TabsContextState {
  tabs?: Tab[]
  addTab(tab: Tab): void,
  removeTab(index: number): void,
  activeTab: number,
  setActiveTab(index: number): void
}

const TabsContext = createContext<TabsContextState>({} as TabsContextState)

export const useTabs = (): TabsContextState => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('useTabs deve ser utilizado como TabsProvider')
  }

  return context
}

export const TabsProvider: React.FC = ({ children }) => {
  const [activeTab, setActiveTab] = useState(-1)
  const [tabs, setTabs] = useState([] as Tab[])

  const addTab = (tab: Tab) => {
    setTabs(tabs => {
      return [...tabs, tab]
    })

    setActiveTab(tabs.length)
  }

  const removeTab = useCallback((index: number) => {
    setTabs(tabs => tabs.filter((tab, i) => i !== index))
    setActiveTab(-1)
  }, [])

  return (
    <TabsContext.Provider value={{ tabs, addTab, removeTab, activeTab, setActiveTab }} >
      {children}
    </TabsContext.Provider>
  )
}
