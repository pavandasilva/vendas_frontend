/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import Swal from 'sweetalert2'
import { makeLogar } from '../../domain/usuarios/factories/makeLogar'
import { AppErrorData } from '../../helpers'
import { useUsuario } from './useUsuario'

const logar = makeLogar()

export function useUseCaseController () {
  const { data: usuarioData, setData: setTokenUsuario } = useUsuario()
  const [error, setError] = useState<AppErrorData>({} as AppErrorData)
  const [executing, setExecuting] = useState(false)

  const [autoLogin] = useState<boolean>(() => {
    const value = localStorage.getItem(`@${process.env.REACT_APP_NAME}:autologin`)
    return value === 'true'
  })

  const executeUseCase = useCallback(async<T> (
    useCase: any,
    paramsUseCase: T,
    sucessMessage: string,
    questionMessage: string,
    afterAll?: () => void,
    toAsk = true
  ) => {
    let questionResponse

    if (toAsk) {
      questionResponse = await Swal.fire({
        icon: 'question',
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        text: questionMessage,
        showCloseButton: true,
        showLoaderOnConfirm: true,
        showCancelButton: true
      })
    }

    if (questionResponse?.isConfirmed || !toAsk) {
      try {
        setExecuting(true)
        const response = await useCase.execute({ ...paramsUseCase, token: usuarioData?.token as string })
        setExecuting(false)
        Swal.fire({
          title: 'Sucesso!',
          text: sucessMessage || response.message,
          icon: 'success',
          timer: 2500,
          timerProgressBar: true
        })
        afterAll && afterAll()

        return response
      } catch (error) {
        setExecuting(false)

        if (error.type === 'auth') {
          Swal.queue([{
            title: usuarioData?.email,
            confirmButtonText: 'Autenticar',
            cancelButtonText: 'Cancelar',
            text: 'Seu acesso ao sistema expirou! Por favor, informe sua senha novamente.',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showLoaderOnConfirm: true,
            showCancelButton: true,

            preConfirm: async (result) => {
              try {
                setExecuting(true)

                const token = await logar.execute({
                  email: usuarioData?.email as string,
                  password: result as string
                })

                setExecuting(false)

                if (token) {
                  setTokenUsuario(token)

                  if (autoLogin) {
                    localStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, token)
                  } else {
                    localStorage.removeItem(`@${process.env.REACT_APP_NAME}:autologin`)
                    localStorage.removeItem(`@${process.env.REACT_APP_NAME}:token`)
                  }

                  setExecuting(true)

                  const response = await executeUseCase(
                    useCase,
                    paramsUseCase,
                    sucessMessage,
                    questionMessage,
                    afterAll,
                    false
                  )

                  setExecuting(false)
                  return response
                }
              } catch (error) {
                setExecuting(false)

                Swal.insertQueueStep({
                  icon: 'error',
                  title: error.message || 'Erro desconhecido',
                  showConfirmButton: false,
                  timer: 3500,
                  timerProgressBar: true
                })
              }
            }
          }])
        } else if (error.type === 'validate') {
          setError(error)
        } else {
          Swal.fire({
            icon: 'error',
            title: error.message || 'Erro desconhecido',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true
          })
        }
      }
    }
  }, [autoLogin, error.type, setTokenUsuario, usuarioData])

  return { executeUseCase, error, executing }
}
