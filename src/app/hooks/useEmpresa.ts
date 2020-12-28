import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerEmpresaPorId } from '../../domain/empresas/factories/makeTrazerEmpresaPorId'
import { useUsuario } from '../hooks'

const trazerEmpresaPorId = makeTrazerEmpresaPorId()

export default function useEmpresa (empresaId: number) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useEmpresa',
    empresaId
  }), () => trazerEmpresaPorId.execute(
    {
      filter: empresaId as unknown as string,
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
