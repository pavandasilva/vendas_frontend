import * as yup from 'yup'
import { Validator } from '../../domain/_interfaces'
import { AppError } from '../../helpers'
import { ValidatorOptions } from './options'

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
