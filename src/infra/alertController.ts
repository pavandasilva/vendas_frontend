import { toast } from 'react-toastify'
import { AlertController } from '../domain/_interfaces'

export class AlertControllerImp implements AlertController {
  error (message: string): void {
    toast.error(message)
  }
}
