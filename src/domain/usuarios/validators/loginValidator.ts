import * as Yup from 'yup'
import { Validator } from '../../_interfaces/validator'

interface LoginValidatorParams {
  email: string,
  password: string
}

export class LoginValidator implements Validator {
  async validate (params: LoginValidatorParams) {
    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
      password: Yup.string().required('Senha obrigatória')
    })

    await schema.validate(params, { abortEarly: false })
  }
}
