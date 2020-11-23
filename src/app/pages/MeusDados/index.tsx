import React from 'react'
import { useUsuario } from '../../hooks/contexts'

export const MeusDados = () => {
  const { data: usuarioData } = useUsuario()

  return (
    <>
      <p>{ usuarioData?.id }</p>
      <p>{ usuarioData?.email }</p>
      <p>{ usuarioData?.nome }</p>
    </>
  )
}
