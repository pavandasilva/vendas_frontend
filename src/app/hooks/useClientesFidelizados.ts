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
    /*  clienteData?.token as string, */
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJieXBhc3NAcm91dGU2Ni5jb20uYnIiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMS0yM1QxOTo0MDowNi4yOTVaIiwidXBkYXRlZF9hdCI6IjIwMjAtMTEtMjNUMTk6NDA6MDYuMjk1WiIsImZ1bmNpb25hcmlvX2lkIjoxMDA3LCJzdGF0dXMiOiJhdGl2byIsIm5vbWUiOiJsYXJpc3NhIHNvdXphIGZlcm1pbm8iLCJpYXQiOjE2MDczNDg2NzMsImV4cCI6MTYwOTk0MDY3M30.Lha29J9-XAdJeoZO7jL3vC0WTMDs7PRNLSMIbUKGLIs',
    perPage,
    (currentPage - 1) * perPage,
    search || ''
  ), {
    dedupingInterval: 60000,
    refreshInterval: 10000
  })

  return { data, error }
}
