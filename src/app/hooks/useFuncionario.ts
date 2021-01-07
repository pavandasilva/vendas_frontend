import { useHistory } from 'react-router-dom'
import useSWR from 'swr'
import { makeTrazerFuncionarioPorId } from '../../domain/funcionarios/factories/makeTrazerFuncionarioPorId'
import { useUsuario } from './useUsuario'

const trazerFuncionarioPorId = makeTrazerFuncionarioPorId()

export function useFuncionario (funcionarioId: number) {
  const { data: usuarioData } = useUsuario()
  const history = useHistory()

  const { data, error } = useSWR(JSON.stringify({
    useCase: 'useFuncionario',
    funcionarioId
  }), () => trazerFuncionarioPorId.execute(
    {
      filter: funcionarioId as unknown as string,
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
