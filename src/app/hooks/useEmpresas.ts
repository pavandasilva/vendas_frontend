import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { useUsuario } from '.'
import { makeTrazerEmpresas } from '../../domain/empresas/factories'

const trazerEmpresas = makeTrazerEmpresas()

interface ExecEmpresas {
  perPage: number,
  currentPage: number,
  search?: string
}

export default function useEmpresas ({ perPage, currentPage, search }: ExecEmpresas) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useEmpresas',
    perPage,
    currentPage,
    search
  }), () => trazerEmpresas.execute(
    usuarioData?.token as string,
    perPage,
    (currentPage - 1) * perPage,
    search || ''
  ), {
    /* dedupingInterval: 60000 */
  })

  if (error?.type === 'auth') {
    history.push('/login')
  }

  return { data, error }
}
