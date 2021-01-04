import { useContext } from 'react'
import { ModalContext, ModalContextProps } from '../contexts/modalContext'

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal deve ser usado com AtendimentoTabsProvider')
  }

  return context
}
