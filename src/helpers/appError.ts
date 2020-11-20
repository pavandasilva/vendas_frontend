export interface AppErrorData {
  type?: 'auth' | 'api' | 'validate'
  message: string
}

export class AppError extends Error implements AppError {
  type?: string
  detail?: string

  constructor (errorData: AppErrorData) {
    const { type, message } = errorData
    super()
    this.type = type
    this.message = message
  }
}
