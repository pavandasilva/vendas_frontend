export interface AppErrorData {
  type?: 'auth' | 'api' | 'validate'
  message: string
  data?: object
}

export class AppError extends Error implements AppError {
  type?: string
  detail?: string
  data?: object

  constructor (errorData: AppErrorData) {
    const { type, message, data } = errorData
    super()
    this.type = type
    this.message = message
    this.data = data
  }
}
