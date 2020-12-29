import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerClientes } from '../../domain/clientes/factories'
import { useUsuario } from './useUsuario'

interface ExecTransportadoras{
  perPage: number,
  currentPage: number,
  search?: string
}

const trazerClientes = makeTrazerClientes()

export function useTransportadoras ({ perPage, currentPage, search }: ExecTransportadoras) {
  console.log('search', search)

  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useTransportadoras',
    perPage,
    currentPage,
    search
  }), () => trazerClientes.execute(
    {
      filter: search || '',
      filterOptions: {
        limit: perPage,
        skip: (currentPage - 1) * perPage
      },
      filterObject: { is_transportadora: 's' },
      token: usuarioData?.token
    }
  ), {
    dedupingInterval: 60000
  })

  if (error?.type === 'auth') {
    history.push('/login')
  }

  return { data, error }
}
