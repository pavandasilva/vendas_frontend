import * as yup from 'yup'

export const ValidatorOptions: yup.ValidateOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: false,
  recursive: true,
  context: yup.object
}
