import LocalStorageService from "./localstorageService";

export const USUARIO_LOGADO = '_usuario_logado'

class AuthService {

    static isUsuarioAtuenticado () {
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado () {
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar (usuario) {
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado () {
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }
}

export default AuthService