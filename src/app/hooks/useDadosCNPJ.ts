
import { makeTrazerDadosCNPJ } from '../../domain/clientes/factories/makeTrazerDadosCNPJ'

const trazerDadosCNPJ = makeTrazerDadosCNPJ()

export function useDadosCNPJ (cnpj: string) {
  let data = null
  let error = null

  if (cnpj.length === 14) {
    trazerDadosCNPJ.execute(
      'bf2cc265e3073aab06df3484f56f603e7c409b55e01cddc0bfde6781624c8494',
      cnpj
    ).then(response => {
      data = null
      if (response?.data) {
        data = response.data
      }
      error = null
    }).catch(err => {
      data = null
      error = err
    })
  }

  return { data, error }
}
