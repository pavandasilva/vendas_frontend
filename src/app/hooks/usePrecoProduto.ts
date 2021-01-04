import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerPrecoProduto } from '../../domain/produtos/factories/makeTrazerPrecoProduto'
import { useUsuario } from './useUsuario'

const trazerPrecoProduto = makeTrazerPrecoProduto()

export function usePrecoProduto (produtoId: number, clienteId: number, empresaId: number, valor?: number) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'usePrecoProduto',
    produtoId,
    clienteId,
    empresaId,
    valor
  }), () => trazerPrecoProduto.execute(
    usuarioData?.token as string,
    produtoId,
    clienteId,
    empresaId,
    valor
  ), {
    dedupingInterval: 60000
  })

  if (error?.type === 'auth') {
    history.push('/login')
  }

  return { data, error }
}
