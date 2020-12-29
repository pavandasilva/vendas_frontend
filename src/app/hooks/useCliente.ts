import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { useUsuario } from '.'
import { makeTrazerClientePorId } from '../../domain/clientes/factories/makeTrazerClientePorId'

const trazerClientePorId = makeTrazerClientePorId()

export function useCliente (clienteId: number) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useCliente',
    clienteId
  }), () => trazerClientePorId.execute(
    {
      filter: clienteId as unknown as string,
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
