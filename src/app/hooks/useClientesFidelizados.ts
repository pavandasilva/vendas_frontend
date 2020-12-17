import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerClientesFidelizados } from '../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { useUsuario } from '../hooks'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

interface ExecClientesFidelizados {
  funcionarioId?: number,
  perPage: number,
  currentPage: number,
  search?: string
}

export default function useClientesFidelizados ({ funcionarioId, perPage, currentPage, search }: ExecClientesFidelizados) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useClientesFidelizados',
    funcionarioId,
    perPage,
    currentPage,
    search
  }), () => trazerClientesFidelizados.execute(
    funcionarioId || usuarioData?.funcionario_id as unknown as number,
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
