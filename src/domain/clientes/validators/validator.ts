import { Validator } from '../../_interfaces'

export class ClienteValidator implements Validator {
  private readonly schemaValidator: Validator

  constructor (validator: Validator) {
    this.schemaValidator = validator
  }

  async validate (object: any): Promise<void> {
    await this.schemaValidator.validate(object)
  }
}
