import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerProdutos } from '../../domain/produtos/factories/makeTrazerProdutos'
import { useUsuario } from './useUsuario'

const trazerProdutos = makeTrazerProdutos()

interface ExecProdutos {
  perPage: number,
  currentPage: number,
  search?: string
}

export function useProdutos ({ perPage, currentPage, search }: ExecProdutos) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useProdutos',
    perPage,
    currentPage,
    search
  }), () => trazerProdutos.execute(
    usuarioData?.token as string,
    perPage,
    (currentPage - 1) * perPage,
    search || ''
  ), {
    dedupingInterval: 60000
  })

  if (error?.type === 'auth') {
    history.push('/login')
  }

  return { data, error }
}
