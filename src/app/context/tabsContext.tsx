import React, { createContext, useState } from 'react'

interface Tab {
  title: string,
  index: number
}

interface TabsContextState {
  tabs?: Tab[]
  addTab(tab: Tab): void,
  activeTab: number,
  setActiveTab(index: number): void
}

export const TabsContext = createContext<TabsContextState>({} as TabsContextState)

export const TabsProvider: React.FC = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState([] as Tab[])

  const addTab = (tab: Tab) => {
    setTabs(tabs => {
      return [...tabs, tab]
    })

    setActiveTab(tab.index)
  }

  return (
    <TabsContext.Provider value={{ tabs, addTab, activeTab, setActiveTab }} >
      {children}
    </TabsContext.Provider>
  )
}
