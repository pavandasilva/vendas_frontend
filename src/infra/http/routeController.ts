import { RouteController } from '../../domain/_interfaces'
import { history } from '../../app/routes/history'

export class RouteControllerImp implements RouteController {
  goTo (path: string): void {
    history.push(path)
  }
}
