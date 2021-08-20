import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService';
import Card from '../components/card'
import currencyFormater from 'currency-formatter'
import {AuthContext} from "../main/provedorAutenticacao";

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor () {
        super();
        this.UsuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado



        this.UsuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({saldo: response.data})
            }).catch(err => {
                console.log(err.response)
            })
    }

    render() {
        return (
            <Card title="Bem Vindo!">
            <div className="jumbotron" style={{color:"white"}}>

                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de {currencyFormater.format(this.state.saldo, {locale: 'pt-BR'})}</p>
                <hr className="my-4"/>
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button" style={{marginRight:"15px"}}>
                            <i className="pi pi-users" /> Cadastrar Usuário
                        </a>
                        <a className="btn btn-danger btn-lg" href="#/cadastro-lancamento" role="button">
                            <i className="pi pi-money-bill"/> Cadastrar Lançamento
                        </a>
                    </p>

            </div>
            </Card>
                )
    }
}

Home.contextType = AuthContext

export default Home;