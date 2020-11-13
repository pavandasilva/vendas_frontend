import { PostParams } from '../../_interfaces/postParams'

interface LoginResponse {
  token: string
}

export interface AuthService {
  login: (params: PostParams) => Promise<LoginResponse | undefined>
}
