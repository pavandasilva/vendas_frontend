import { Usuario } from '../models/usuario'

export interface UsuarioService{
  getOne: (filter: object) => Promise<Usuario | undefined>
}
