import React, { ReactNode, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import { Button } from '..'

import { BoxModal, Container, Header, ContainerFooter, Content } from './styles'

interface ModalProps {
  title?: string
  children?: ReactNode
  buttonSaveText?: string
  buttonCancelText?: string
  showButtonSave?: boolean
  mode?: 'fullscreen' | 'normal'
  close: () => void
  onSave?: () => void
}

export const Modal = ({ title, children, buttonSaveText, buttonCancelText, showButtonSave, mode = 'normal', close, onSave }: ModalProps) => {
  const handleSaveButtonClick = useCallback(() => {
    onSave && onSave()
    close()
  }, [close, onSave])

  return (
    <Container>
      <BoxModal mode={mode}>
        <Content>
          <Header>

            <div onClick={close}> <h1>{title && title}</h1><FiX /></div>
          </Header>
          <div>
            {children}
          </div>
          <ContainerFooter>
            <Button mode="cancel" onClick={close}>{buttonCancelText || 'Cancelar'}</Button>
            { showButtonSave && <Button mode="confirm" onClick={handleSaveButtonClick}>{buttonSaveText || 'Salvar'}</Button>}
          </ContainerFooter>
        </Content>

      </BoxModal>
    </Container>
  )
}
