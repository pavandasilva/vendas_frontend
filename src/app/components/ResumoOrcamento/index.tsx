import React from 'react'
import { Card } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { formatFloatToCurrency } from '../../../helpers'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { Container } from './styles'

interface ResumoOrcamentoProps {
  cliente: Cliente
}

export const ResumoOrcamento = ({ cliente }: ResumoOrcamentoProps) => {
  const { orcamentos } = useOrcamentos()

  return (
    <Container>
      <Card mode="normal" title="Itens" text={orcamentos[cliente?.id as number]?.itens?.length as unknown as string}/>
      <Card mode="info" title="Sub total" text={orcamentos[cliente?.id as number]?.itens?.length as unknown as string}/>
      <Card mode="danger" title="Acréscimos" text={orcamentos[cliente?.id as number]?.acrescimos as unknown as string}/>
      <Card mode="success" title="Descontos" text={orcamentos[cliente?.id as number]?.descontos as unknown as string}/>
      <Card mode="danger" title="Juros" text="0.00"/>
      <Card mode="danger" title="ST" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.st as number)}/>
      <Card mode="info" title="Valor total" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.total as number)}/>
    </Container>
  )
}
