import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerFuncionarios } from '../../domain/funcionarios/factories'
import { useUsuario } from './useUsuario'

const trazerFuncionarios = makeTrazerFuncionarios()

interface ExecFuncionarios {
  perPage: number,
  currentPage: number,
  search?: string
}

export function useFuncionarios ({ perPage, currentPage, search }: ExecFuncionarios) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useFuncionarios',
    perPage,
    currentPage,
    search
  }), () => trazerFuncionarios.execute({
    token: usuarioData?.token as string,
    filterOptions: {
      limit: perPage,
      skip: (currentPage - 1) * perPage
    },
    filter: search || ''
  }
  ), {
    dedupingInterval: 60000
  })

  if (error?.type === 'auth') {
    history.push('/login')
  }

  return { data, error }
}
