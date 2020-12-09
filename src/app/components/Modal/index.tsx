import React, { ReactNode } from 'react'
import { FiX } from 'react-icons/fi'
import { Button } from '..'

import { BoxModal, Container, Header } from './styles'

interface ModalProps {
  title?: string
  children?: ReactNode
  buttonSaveText?: string
  buttonCancelText?: string
  showButtonSave?: boolean
  close: () => void
}

export const Modal = ({ title, children, buttonSaveText, buttonCancelText, showButtonSave, close }: ModalProps) => {
  return (
    <Container>
      <BoxModal>
        <Header>
          <h1>{title && title}</h1>
          <div onClick={close}><FiX /></div>
        </Header>
        <div>
          {children}
        </div>
        <footer>
          <Button mode="cancel" onClick={close}>{buttonCancelText || 'Cancelar'}</Button>
          { showButtonSave && <Button mode="confirm">{buttonSaveText || 'Salvar'}</Button>}
        </footer>
      </BoxModal>
    </Container>
  )
}
