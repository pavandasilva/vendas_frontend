import { useContext } from 'react'
import { ItemOrcamentoContext, ItemOrcamentoContextProps } from '../contexts/index'

export const useItemOrcamento = (): ItemOrcamentoContextProps => {
  const context = useContext(ItemOrcamentoContext)

  if (!context) {
    throw new Error('useItemOrcamento deve ser usado com dadastroClienteProvider')
  }

  return context
}
