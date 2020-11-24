/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup'
import { Validator } from '../../domain/_interfaces'
import { AppError } from '../../helpers'
import { ValidatorOptions } from './options'

yup.setLocale({
  mixed: {
    default: '${path} é inválido',
    required: '${path} é um campo obrigatório',
    oneOf: '${path} deve ser um dos seguintes valores: ${values}',
    notOneOf: '${path} não pode ser um dos seguintes valores: ${values}'
  },
  string: {
    length: '${path} deve ter exatamente ${length} caracteres',
    min: '${path} deve ter pelo menos ${min} caracteres',
    max: '${path} deve ter no máximo ${max} caracteres',
    email: '${path} tem o formato de e-mail inválido',
    url: '${path} deve ter um formato de URL válida',
    trim: '${path} não deve conter espaços no início ou no fim.',
    lowercase: '${path} deve estar em maiúsculo',
    uppercase: '${path} deve estar em minúsculo'
  },
  number: {
    min: '${path} deve ser no mínimo ${min}',
    max: '${path} deve ser no máximo ${max}',
    lessThan: '${path} deve ser menor que ${less}',
    moreThan: '${path} deve ser maior que ${more}',
    positive: '${path} deve ser um número posítivo',
    negative: '${path} deve ser um número negativo',
    integer: '${path} deve ser um número inteiro'
  },
  date: {
    min: '${path} deve ser maior que a data ${min}',
    max: '${path} deve ser menor que a data ${max}'
  },
  array: {
    min: '${path} deve ter no mínimo ${min} itens',
    max: '${path} deve ter no máximo ${max} itens'
  }
})

export class SchemaValidator implements Validator {
  private readonly validatorSchema: yup.ObjectSchema

  constructor (validatorSchema: yup.ObjectSchema) {
    this.validatorSchema = validatorSchema
  }

  async validate (object: any): Promise<void> {
    try {
      await this.validatorSchema.validate(object, ValidatorOptions)
    } catch (error) {
      let dataError: any = { }

      error.inner.forEach(({ path, message }: any) => {
        dataError = { ...dataError, [path]: message }
      })

      throw new AppError({
        type: 'validate',
        message: 'Erro de validação',
        data: dataError
      })
    }
  }
}
