import { useContext } from 'react'
import { TabsContext, TabsContextProps } from '../contexts'

export const useTabs = (): TabsContextProps => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('useTabs deve ser utilizado com TabsProvider')
  }

  return context
}
