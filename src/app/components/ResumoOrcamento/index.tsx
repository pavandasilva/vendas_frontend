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
      <Card mode="normal" title="Itens" text={orcamentos[cliente?.id as number]?.qtdeItens as unknown as string}/>
      <Card mode="info" title="Sub total" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.subtotal as number)}/>
      <Card mode="danger" title="Acréscimos" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.acrescimos)}/>
      <Card mode="success" title="Descontos" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.descontos)}/>
      <Card mode="danger" title="Juros" text="0.00"/>
      <Card mode="danger" title="ST" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.st as number)}/>
      <Card mode="info" title="Valor total" text={formatFloatToCurrency(orcamentos[cliente?.id as number]?.total as number)}/>
    </Container>
  )
}
