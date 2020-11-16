import React, { createContext, useContext, useState } from 'react'

interface SideBarContextState {
  isVisible: boolean
  toogle(): void
}

const SideBarContext = createContext<SideBarContextState>({} as SideBarContextState)

export const useSideBar = (): SideBarContextState => {
  const context = useContext(SideBarContext)

  if (!context) {
    throw new Error('useSideBar deve ser usado com SideBarContext')
  }

  return context
}

export const SideBarProvider: React.FC = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true)

  const toogle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <SideBarContext.Provider value={{ isVisible, toogle }} >
      {children}
    </SideBarContext.Provider>
  )
}
