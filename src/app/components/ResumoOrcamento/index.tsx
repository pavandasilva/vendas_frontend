import React from 'react'
import { Card } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { formatFloatToCurrency } from '../../../helpers'
import { useAtendimentos } from '../../hooks'
import { Container } from './styles'

interface ResumoOrcamentoProps {
  cliente: Cliente
}

export const ResumoOrcamento = ({ cliente }: ResumoOrcamentoProps) => {
  const { atendimentos } = useAtendimentos()

  return (
    <Container>
      <Card
        mode="normal"
        title="Itens"
        text={atendimentos[cliente?.id as number]?.orcamento?.qtdeItens as unknown as string}
      />
      <Card mode="info" title="Sub total" text={formatFloatToCurrency(atendimentos[cliente?.id as number]?.orcamento?.subtotal as number)}/>
      <Card mode="danger" title="Acréscimos" text={formatFloatToCurrency(atendimentos[cliente?.id as number]?.orcamento?.acrescimos as number)}/>
      <Card mode="success" title="Descontos" text={formatFloatToCurrency(atendimentos[cliente?.id as number]?.orcamento?.descontos as number)}/>
      <Card mode="danger" title="Juros" text="0.00"/>
      <Card mode="danger" title="ST" text={formatFloatToCurrency(atendimentos[cliente?.id as number]?.orcamento?.st as number)}/>
      <Card mode="info" title="Valor total" text={formatFloatToCurrency(atendimentos[cliente?.id as number]?.orcamento?.total as number)}/>
    </Container>
  )
}
