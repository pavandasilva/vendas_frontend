import { PostParams } from '../../_interfaces/postParams'
import { Usuario } from '../models/usuario'

export interface AuthService {
  login: (params: PostParams) => Promise<Usuario | undefined>
}
