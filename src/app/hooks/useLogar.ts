import { useState, useCallback } from 'react'
import jwt_decode from 'jwt-decode'
import { makeLogar } from '../../domain/usuarios/factories/makeLogar'
import { Usuario } from '../../domain/usuarios/models/usuario'
import { useUsuario } from './contexts/usuarioContext'
import { toast } from 'react-toastify'

const logar = makeLogar()

interface ExecLogar {
  email: string,
  password: string
}

interface UseLogar {
  data: string
  loading: boolean
  error: any
}

export default function useLogar () {
  const [response, setResponse] = useState({
    data: '',
    loading: false,
    error: null
  } as UseLogar)

  const { setData } = useUsuario()

  const execLogar = useCallback(async ({ email, password }: ExecLogar) => {
    try {
      const response = await logar.execute({
        email,
        password
      })

      setResponse({ data: response as string, loading: false, error: null })

      if (response) {
        localStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, response)
        const dataUsuario = jwt_decode(response) as Usuario
        dataUsuario.token = response
        setData(dataUsuario)
      }
    } catch (error) {
      setResponse({ data: '', loading: false, error })
      toast.error(error.message)
    }
  }, [setData])

  return { response, execLogar }
}
