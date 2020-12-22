import React, { useState } from 'react'
import { Card } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { Container } from './styles'

interface ResumoOrcamentoProps {
  cliente: Cliente
}

export const ResumoOrcamento = ({ cliente }: ResumoOrcamentoProps) => {
  const { orcamentos, setOrcamento } = useOrcamentos()

  return (
    <Container>
      <Card mode="normal" title="Itens" text={orcamentos[cliente.id as number].length as unknown as string}/>
      <Card mode="info" title="Sub total" text={orcamentos[cliente.id as number].length as unknown as string}/>
      <Card mode="danger" title="Acréscimos" text="415,99"/>
      <Card mode="success" title="Descontos" text="15,99"/>
      <Card mode="danger" title="IPI/ISS" text="0.00"/>
      <Card mode="danger" title="ICMS" text="0.00"/>
      <Card mode="danger" title="Juros" text="0.00"/>
      <Card mode="danger" title="ST" text="11.45"/>
      <Card mode="info" title="Valor total" text="11111.45,90"/>
    </Container>
  )
}
