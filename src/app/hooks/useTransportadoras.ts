import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { useUsuario } from '.'
import { makeTrazerClientes } from '../../domain/clientes/factories'

const trazerClientes = makeTrazerClientes()

export default function useTransportadoras () {
  const { data: usuarioData } = useUsuario()
  const [filter, setFilter] = useState('')
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useTransportadoras'
  }), () => trazerClientes.execute(
    {
      filter,
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
