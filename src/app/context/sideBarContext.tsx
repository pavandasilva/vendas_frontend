import React, { createContext, useState } from 'react'

interface SideBarContextState {
  isVisible: boolean
  toogle(): void
}

export const SideBarContext = createContext<SideBarContextState>({} as SideBarContextState)

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
