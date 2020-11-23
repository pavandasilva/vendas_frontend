import useSWR from 'swr'
import { makeTrazerClientesFidelizados } from '../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { useUsuario } from './contexts/usuarioContext'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

interface ExecClientesFidelizados {
  funcionarioId?: number,
  perPage: number,
  currentPage: number,
  search?: string
}

export default function useClientesFidelizados ({ funcionarioId, perPage, currentPage, search }: ExecClientesFidelizados) {
  const { data: clienteData } = useUsuario()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useClientesFidelizados',
    funcionarioId,
    perPage,
    currentPage,
    search
  }), () => trazerClientesFidelizados.execute(
    funcionarioId || clienteData?.funcionario_id as unknown as number,
    clienteData?.token as string,
    perPage,
    (currentPage - 1) * perPage,
    search || ''
  ), {
    dedupingInterval: 60000,
    refreshInterval: 10000
  })

  return { data, error }
}
