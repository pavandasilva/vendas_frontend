import { useContext } from 'react'
import { TabsContext, TabsContextProps } from '../contexts'

export const useTabs = (): TabsContextProps => {
  const context = useContext(TabsContext)

  if (!context) {
    console.error('useTabs deve ser utilizado com TabsProvider')
  }

  return context
}
