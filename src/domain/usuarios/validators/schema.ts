import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória')
})
