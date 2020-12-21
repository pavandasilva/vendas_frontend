import { useContext } from 'react'
import { CurrentTab } from '../contexts'
import { TabCadastroClienteContext } from '../contexts/tabCadastroClienteContext'

export const useTabCadastroCliente = (): [CurrentTab, React.Dispatch<React.SetStateAction<CurrentTab>>] => {
  const context = useContext(TabCadastroClienteContext)

  if (!context) {
    throw new Error('useTabCadastroClient deve ser usado com TabCadastroClienteContext')
  }

  return context
}
