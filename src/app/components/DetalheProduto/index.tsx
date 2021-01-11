import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Cliente } from '../../../domain/clientes/models'
import { ItemOrcamento } from '../../../domain/pedidos/models/itemOrcamento'
import { Preco, Produto } from '../../../domain/produtos/models'
import { formatFloatToCurrency } from '../../../helpers'
import { useAtendimentos } from '../../hooks'
import { useModal } from '../../hooks/useModal'
import { usePrecoProduto } from '../../hooks/usePrecoProduto'
import { FormRow } from '../../styles/global'
import { Input } from '../Input'
import { Spinner } from '../Spinner'
import { Container, Inputs, Loading } from './styles'

interface DetalheProdutoProps {
  cliente?: Cliente
  produto?: Produto
  handleAddItemOrcamento?: () => ItemOrcamento
}

export const DetalheProduto = ({ cliente, produto }: DetalheProdutoProps) => {
  const { atendimentos } = useAtendimentos()
  const { setData: setModalData } = useModal()
  const [valor, setValor] = useState<number>()

  const { data: preco } = usePrecoProduto(
    produto?.id as number,
    cliente?.id as number,
    atendimentos[cliente?.id as number]?.orcamento?.deposito?.id as number,
    valor
  )

  const [total, setTotal] = useState(0)
  const [descAcres, setDescAcres] = useState(0)
  const [qtde, setQtde] = useState(1)
  const [st, setSt] = useState(0)
  const [valorUnitario, setValorUnitario] = useState(0)
  const [editableValorUnitario, setEditableValorUnitario] = useState(0)

  useEffect(() => {
    setSt((preco?.data?.st || 0) * qtde)
  }, [preco, qtde])

  useEffect(() => {
    setTotal(valor as number * qtde + st)
  }, [qtde, st, valor])

  useEffect(() => {
    if (preco?.data?.valorOriginal) {
      const valorOrginal = preco.data.valorOriginal
      setValor((descAcres / 100 * valorOrginal) + valorOrginal)
    }
  }, [descAcres, preco])

  useEffect(() => {
    let desconto: number = 0
    let acrescimo: number = 0

    if (preco?.data?.valorOriginal && valor) {
      const diferenca = preco?.data?.valorOriginal - valor

      if (diferenca < 0) {
        acrescimo = diferenca * -1 * qtde
        desconto = 0
      } else if (diferenca > 0) {
        acrescimo = 0
        desconto = diferenca * qtde
      } else {
        acrescimo = 0
        desconto = 0
      }
    }

    const itemOrcamento: ItemOrcamento = {
      acrescimo,
      desconto,
      valorUnitario: total / qtde || 0,
      quantidade: qtde,
      stTotal: st || 0 * qtde,
      total: total || 0,
      produto,
      preco: preco?.data as unknown as Preco
    }

    setModalData(itemOrcamento)
  }, [descAcres, preco, produto, qtde, setModalData, st, total, valor])

  const handleQtdeOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 1) {
      return
    }

    setQtde(parseInt(e.target.value))
  }, [])

  const handlePrecoUnitarioOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let [integer, decimals] = e.currentTarget.value.split(',', 2)
    integer = integer.toString().replace(/\./g, '')

    if (!integer) {
      integer = '0'
    }

    const valorUnitario = parseFloat(`${integer}.${decimals}`)
    setEditableValorUnitario(valorUnitario)
  }, [])

  const handleDescAcresOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > -100) {
      setDescAcres(e.target.value as unknown as number)
    }
  }, [])

  useEffect(() => {
    if (total > 0) {
      setValorUnitario(total / qtde)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  const handlePrecoUnitarioOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (editableValorUnitario < 0) {
      return
    }

    if (preco?.data?.valorOriginal) {
      const valorOriginal = preco?.data?.valorOriginal
      const diferenca = editableValorUnitario - valorOriginal
      const porcentagem = diferenca / valorOriginal * 100
      setDescAcres(porcentagem)
    }

    setEditableValorUnitario(0)
  }

  return (
    <Container>
      { preco
        ? <>
          <ul>
            <li key={produto?.id}>{`Valor: ${formatFloatToCurrency(preco?.data?.valorOriginal || 0)}`}</li>
          </ul>

          <Inputs>
            <FormRow width="120px">
              <Input
                value={qtde}
                label="Quantidade"
                width={'100'}
                type="number"
                min="1"
                tabIndex={0}
                autoFocus={true}
                onChange={handleQtdeOnChange}
              />
            </FormRow>

            <FormRow>
              <Input
                value={formatFloatToCurrency(editableValorUnitario || valorUnitario)}
                label="Valor unitário"
                width="3"
                onChange={handlePrecoUnitarioOnChange}
                onBlur={handlePrecoUnitarioOnBlur}
                type="currency"
              />
              <Input
                value={descAcres}
                label="Desconto/Acréscimo %"
                type="number"
                min="-100"
                width="1"
                onChange={handleDescAcresOnChange}
              />
            </FormRow>

            <FormRow>
              <Input value={formatFloatToCurrency(st as number)} label="ST" width="1"/>
              <Input value={formatFloatToCurrency(total as number)} label="Total" width="3"/>
            </FormRow>
          </Inputs>
        </>
        : (
          <Loading>
            <Spinner/>
          </Loading>
        )
      }
    </Container>
  )
}
