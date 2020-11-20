import { useState, useCallback } from 'react'
import { makeTrazerClientesFidelizados } from '../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { Cliente } from '../../domain/clientes/models/cliente'
import { useUsuario } from './contexts/usuarioContext'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

interface ExecClientesFidelizados {
  funcionarioId?: number,
  perPage: number,
  currentPage: number,
  search?: string
}

interface UseClientesFidelizados {
  data: Cliente[]
  count: number
  loading: boolean
  error: any
}

export default function useClientesFidelizados () {
  const { data: clienteData } = useUsuario()

  const [clientesFidelizados, setClientesFidelizados] = useState({
    data: [] as Cliente[],
    count: 0,
    loading: false,
    error: null
  } as UseClientesFidelizados)

  const execTrazerClientesFidelizados = useCallback(async ({ funcionarioId, perPage, currentPage, search }: ExecClientesFidelizados) => {
    try {
      const response = await trazerClientesFidelizados.execute(
        funcionarioId || clienteData?.funcionario_id as unknown as number,
        clienteData?.token as string,
        perPage,
        (currentPage - 1) * perPage,
        search || ''
      )

      setClientesFidelizados({ data: response.data, count: response.metadata.count, loading: false, error: null })
    } catch (error) {
      setClientesFidelizados({ data: [] as Cliente[], count: 0, loading: false, error: error })
    }
  }, [clienteData])

  return [clientesFidelizados, execTrazerClientesFidelizados] as const
}
