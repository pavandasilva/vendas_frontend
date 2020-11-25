import { toast } from 'react-toastify'
import { makeCadastrarCliente } from '../../domain/clientes/factories/makeCadastrarCliente'
import { Cliente } from '../../domain/clientes/models/cliente'
import { useUsuario } from './contexts/usuarioContext'

const cadastrarCliente = makeCadastrarCliente()

interface AddResponse {
  data: Cliente,
  loading: boolean,
  error: any
}

export default function useClientes () {
  const { data: dadosUsuario } = useUsuario()

  const add = async (cliente: Cliente, token?: string): Promise<AddResponse> => {
    try {
      const data = await cadastrarCliente.execute({ body: cliente, token: token || dadosUsuario?.token })

      if (data) {
        toast.success('Cliente cadastrado com sucesso')
      } else {
        toast.warning('O servidor não retornou uma confirmação de cadastro de cliente. Por favor, verificar')
      }

      return {
        data,
        error: null,
        loading: false
      }
    } catch (error) {
      if (error.type !== 'validate') {
        toast.error(error.message.replace('Error: ', ''))
      }

      return {
        data: {} as Cliente,
        error: error.data,
        loading: false
      }
    }
  }

  return { add }
}
