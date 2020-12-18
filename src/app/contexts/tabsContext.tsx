import React, { createContext, useCallback, useEffect, useState } from 'react'

interface Tab {
  title: string,
  index: number,
  content: React.ReactNode
}

export interface TabsContextProps {
  tabs?: Tab[]
  addTab(tab: Tab): void,
  removeTab(index: number): void,
  activeTab: number,
  setActiveTab(index: number): void,
}

export const TabsContext = createContext<TabsContextProps>({} as TabsContextProps)

export const TabsProvider: React.FC = ({ children }) => {
  const [activeTab, setActiveTab] = useState(-1)
  const [tabs, setTabs] = useState([] as Tab[])

  useEffect(() => {
    setActiveTab(tabs.length - 1)
  }, [tabs.length])

  const addTab = useCallback((tab: Tab) => {
    const finded = tabs.findIndex((t) => t.index === tab.index)

    if (finded > -1) {
      setActiveTab(finded)
      return
    }

    setTabs(oldState => {
      const newState = [
        ...oldState,
        tab
      ]

      return newState
    })
  }, [tabs])

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
