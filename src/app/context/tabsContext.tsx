import React, { createContext, useCallback, useState } from 'react'

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

export const TabsContext = createContext<TabsContextState>({} as TabsContextState)

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
    setActiveTab(index - 1)
  }, [])

  return (
    <TabsContext.Provider value={{ tabs, addTab, removeTab, activeTab, setActiveTab }} >
      {children}
    </TabsContext.Provider>
  )
}
